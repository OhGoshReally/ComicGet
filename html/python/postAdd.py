#!/usr/bin/python

import sys
import json
import requests
import os

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../library/list.json')
filename = os.path.abspath(os.path.realpath(filename))

baseurl = 'https://kitsu.io/api/edge/manga/'

print("Hello, World!")
print(sys.argv[1])
print(baseurl + sys.argv[1])

fullurl = baseurl + sys.argv[1]
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
with open('tezt2.json', 'w') as outfile:
    json.dump(jsondb, outfile)

theid = [result['id']]
theid = json.loads(theid[0])

imgdir = os.path.join(fileDir, '../library/img/' + str(theid))
imgdir = os.path.abspath(os.path.realpath(imgdir))

if not os.path.exists(imgdir):
    os.makedirs(imgdir)

imgpath = os.path.join(imgdir, './poster.jpg')
imgpath = os.path.abspath(os.path.realpath(imgpath))

url = attributes['posterImage']['small']

r = requests.get(url)
with open(imgpath, 'wb') as f:
    f.write(r.content)