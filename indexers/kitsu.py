import requests

from .baseindexer import BaseIndexer

class KitsuIndexer(BaseIndexer):
    api_path = "https://kitsu.io/api/edge/manga"
    api_headers = {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
        }
    indexer_id = 'KITSU'

    def __init__(self, user_agent=None):
        super().__init__(user_agent)
        self.api_headers['user-agent'] = self.user_agent

    def search(self, text_string=None, genre_list=None, limit=None, offset=None):
        keys = ['id', 'type', '']
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
            attributes = result['attributes']
            posters = attributes['posterImage']
            covers = attributes['coverImage']
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

            cover = {}
            if covers != None:
                for size in sizes:
                    if size in covers:
                        cover[size] = covers[size]
            
            manga['cover'] = cover

            response['data'].append(manga)

        return response


    def get_id(self):
        return self.indexer_id
