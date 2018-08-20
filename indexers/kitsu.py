import requests
import os

from .baseindexer import BaseIndexer, BaseCacher

class KitsuIndexer(BaseIndexer):
    api_path = "https://kitsu.io/api/edge/manga"
    api_headers = {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
        }
    indexer_id = 'KITSU'
    cacher = None

    def __init__(self, user_agent=None, cache_dir=None):
        super().__init__(user_agent)
        self.api_headers['user-agent'] = self.user_agent
        if cache_dir:
            self.cacher = KitsuCacher()
            self.cacher.set_cache(cache_dir)

    def search(self, text_string=None, genre_list=None, limit=None, offset=None):
        data = {}
        if (text_string != None):
            data['filter[text]'] = text_string
        if (genre_list != None):
            data['filter[genre]'] = ','.join(genre_list)
        if (limit != None):
            data['page[limit]'] = limit
        if (offset != None):
            data['page[offset]'] = offset

        r = requests.get(self.api_path, params=data, headers=self.api_headers)

        j = r.json()

        response = {}
        response['indexer_id'] = self.indexer_id
        response['data'] = []

        for result in j['data']:
            external_link = 'https://kitsu.io/manga/'
            attributes = result['attributes']
            posters = attributes['posterImage']
            covers = attributes['coverImage']
            slug = attributes['slug']
            manga = {
                'id': result['id'],
                'type': result['type'],
                'title': attributes['canonicalTitle'],
                'synopsis': attributes['synopsis'],
                'start_date': attributes['startDate'],
                'end_date': attributes['endDate'],
                'status': attributes['status'],
                'chapter_count': attributes['chapterCount'],
                'volume_count': attributes['volumeCount'],
                'serialization': attributes['serialization'],
                'average_rating': attributes['averageRating']
            }
            sizes = ['tiny', 'small', 'medium', 'large', 'original']
            poster = {}
            if posters != None:
                for size in sizes:
                    if size in posters:
                        poster[size] = posters[size]

            manga['poster'] = poster

            tagurl = result['relationships']['categories']['links']['related']
            tagres = requests.get(tagurl)
            tagjso = tagres.json()
            tags = {}
            tagnmb = 0
            for tag in tagjso['data']:
                tags[tagnmb] = tag['attributes']['title']
                tagnmb += 1

            manga['tags'] = tags

            cover = {}
            if covers != None:
                for size in sizes:
                    if size in covers:
                        cover[size] = covers[size]

            manga['cover'] = cover

            manga['external_link'] = external_link + slug

            #self.cache_imgs(manga['id'], 'poster', poster)
            #self.cache_imgs(manga['id'], 'cover', cover)

            response['data'].append(manga)

        

        return response

    def get_cacher(self):
        return self.cacher


    def cache_imgs(self, id, type, images):
        if not images:
            return None
        for key, val in images.items():
            print("caching (%s) with (%s)" % (key, val))
            if not self.cacher.is_cached(os.path.join(id, type, key + ".jpg")):
                print("caching (%s) with (%s)" % (key, val))
                self.cacher.cache(os.path.join(id, type, key + ".jpg"), val)


    def create_cache(self, cache_dir=None):
        self.cacher = KitsuCacher()
        self.cacher.set_cache(cache_dir)


class KitsuCacher(BaseCacher):
    indexer_id = 'KITSU'
