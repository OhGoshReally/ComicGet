#!/usr/bin/python

import json
import requests
import os
import sys
from db import database as p
from datetime import date,datetime

class Add():

    def addcomic(self, text_string=None):
        if (text_string != None):
            userinput = str(text_string[0])

            fileDir = os.path.dirname(os.path.realpath('__file__'))

            ############# VARIABLES #############

            baseurl = 'https://kitsu.io/api/edge/manga/'
            metadatabase = "/static/library/img/"
            backupbanner = 'https://kitsu.io/images/default_cover-7bda2081d0823731a96bbb20b70f4fcf.png'
            externalbaseurl = 'https://kitsu.io/manga/'
            indexer = "Kitsu"
            filepathbase = '/home/dan/fakepath/'

            ############# SET URL PARAMETERS #############

            allparams = []

            ######## FILTER DATA ########

            urlheadparam = '?fields[manga]='
            urlparams = [
                'canonicalTitle',
                'startDate',
                'slug',
                'abbreviatedTitles',
                'titles',
                'synopsis',
                'status',
                'posterImage',
                'coverImage',
                'serialization',
                'averageRating'
            ]

            allparams.append(urlheadparam + ','.join(urlparams))

            ######## INCLUDE ########

            urlheadparam = '&include='
            urlparams = [
                'categories',
                'chapters'
            ]

            allparams.append(urlheadparam + ','.join(urlparams))

            ######## FILTER CATEGORIES ########

            urlheadparam = '&fields[categories]='
            urlparams = [
                'title'
            ]

            allparams.append(urlheadparam + ','.join(urlparams))

            ######## FILTER CHAPTERS ########

            urlheadparam = '&fields[chapters]='
            urlparams = [
                'canonicalTitle',
                'number'
            ]

            allparams.append(urlheadparam + ','.join(urlparams))

            allparams = ''.join(allparams)

            ############# START #############

            newentry = p.Comic.create()

            print("Adding comic", userinput)
            print("Adding with local id", str(newentry.id))
            print("Fetching information from indexer")

            ############# PARSE #############

            fullurl = baseurl + userinput + allparams
            response = requests.get(fullurl)
            json_data = response.json()

            result = json_data['data']
            attributes = result['attributes']

            if attributes['averageRating'] is None:
                rating = "No rating"
            else:
                rating = (attributes['averageRating'])[0] + "." + (attributes['averageRating'])[1]

            tags = []
            chapters = []

            for i in json_data['included']:
                if i['type'] == 'categories':
                    tags.append(i['attributes']['title'])
                elif i['type'] == 'chapters':
                    chapters.append([i['attributes']['canonicalTitle'], i['attributes']['number']])

            chapters = list(reversed(chapters))

            ########### SAVE & CREATE CACHE ###########

            imgdir = os.path.join(fileDir, './html/library/img/' + str(newentry.id))
            imgdir = os.path.abspath(os.path.realpath(imgdir))

            if not os.path.exists(imgdir):
                os.makedirs(imgdir)

            imgpath = os.path.join(imgdir, './poster.jpg')
            imgpath = os.path.abspath(os.path.realpath(imgpath))

            url = attributes['posterImage']['small']

            r = requests.get(url)
            with open(imgpath, 'wb') as f:
                f.write(r.content)

            imgpath = os.path.join(imgdir, './banner.jpg')
            imgpath = os.path.abspath(os.path.realpath(imgpath))

            if (attributes['coverImage'] is None):
                url = backupbanner
            else:
                url = attributes['coverImage']['original']

            r = requests.get(url)
            with open(imgpath, 'wb') as f:
                f.write(r.content)

            ######################

            if (attributes['status'] == "finished"):
                status = 0
            else:
                status = 1

            synopsis = attributes['synopsis'].replace('\r', '').replace('\n', '').replace('\b', '').replace('\t', '').replace('\"','\'')


            newentry.title = attributes['canonicalTitle']
            newentry.titleslug = attributes['slug']
            newentry.activestatus = status
            newentry.synopsis = synopsis
            newentry.publisher = attributes['serialization']
            newentry.startdate = datetime.strptime(attributes['startDate'], '%Y-%m-%d').date()
            newentry.filepath = filepathbase + attributes['canonicalTitle'] + " (" + str(datetime.strptime(attributes['startDate'], '%Y-%m-%d').date().year) + ")"
            newentry.fileprofile = 'Large'
            newentry.rating = rating
            newentry.size = '0MB'
            newentry.files = '0 files'
            newentry.externalsite = indexer
            newentry.externallink = externalbaseurl + attributes['slug']
            newentry.externalid = result['id']

            newentry.save()


            for c in chapters:
                p.Chapter.create(
                    comic=newentry, 
                    name=c[0], 
                    monitored=1,
                    exists_on_disk=0,
                    pages=0,
                    number=c[1]
                )

            for a in attributes['abbreviatedTitles']:
                p.Alternative_Names.create(
                    comic = newentry, 
                    name = a
                )

            for t in tags:
                p.Tag.create(
                    comic = newentry, 
                    tag = t
                )

            p.Metadata_Items.create(
                comic = newentry, 
                posterpath = metadatabase + str(newentry.id) + "/poster.jpg",
                bannerpath = metadatabase + str(newentry.id) + "/banner.jpg"
            )

            print("Done - Database updated")