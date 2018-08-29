#!/usr/bin/python

import json
import requests
import os

class Add():

    def addcomic(self, text_string=None):
        if (text_string != None):
            userinput = str(text_string[0])

            fileDir = os.path.dirname(os.path.realpath('__file__'))
            filename = os.path.join(fileDir, './html/library/list.json')
            filename = os.path.abspath(os.path.realpath(filename))

            baseurl = 'https://kitsu.io/api/edge/manga/'

            print("Adding comic")
            print(userinput)
            print(baseurl + userinput)

            fullurl = baseurl + userinput
            response = requests.get(fullurl)
            json_data = json.loads(response.text)

            result = json_data['data']
            attributes = result['attributes']

            manga = {
                'id': result['id'],
                'type': result['type'],
                'title': attributes['canonicalTitle'],
                'synopsis': attributes['synopsis'],
                'start_date': attributes['startDate'],
                'end_date': attributes['endDate'],
                'status': attributes['status'],
                'volume_count': attributes['volumeCount'],
                'publisher': attributes['serialization'],
                'rating': attributes['averageRating'],
                'indexer': "KITSU"
            }

            tagurl = result['relationships']['categories']['links']['related']
            tagres = requests.get(tagurl)
            tagjso = tagres.json()
            tags = {}
            tagnmb = 0
            for tag in tagjso['data']:
                tags[tagnmb] = tag['attributes']['title']
                tagnmb += 1

            manga['tags'] = tags

            chaurl = result['relationships']['chapters']['links']['self']
            chares = requests.get(chaurl)
            chajso = chares.json()
            chapter_count = len(chajso['data'])

            manga['chapters'] = chapter_count

            monitored = {
                'got': chapter_count,
                'want': chapter_count
            }

            manga['monitored'] = monitored
            
            with open(filename) as f:
                jsondb = json.load(f)

            jsondb[result['id']] = manga
            with open(filename, 'w') as outfile:
                json.dump(jsondb, outfile)

            theid = [result['id']]
            theid = json.loads(theid[0])

            imgdir = os.path.join(fileDir, './html/library/img/' + str(theid))
            imgdir = os.path.abspath(os.path.realpath(imgdir))

            if not os.path.exists(imgdir):
                os.makedirs(imgdir)

            imgpath = os.path.join(imgdir, './poster.jpg')
            imgpath = os.path.abspath(os.path.realpath(imgpath))
            print(imgpath)

            url = attributes['posterImage']['small']

            r = requests.get(url)
            with open(imgpath, 'wb') as f:
                f.write(r.content)
