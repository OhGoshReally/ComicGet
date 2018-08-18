import requests

from .baseindexer import BaseIndexer

class KitsuIndexer(BaseIndexer):
    api_path = "https://kitsu.io/api/edge/manga"
    api_headers = {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
        }

    def __init__(self, user_agent=None):
        super().__init__(user_agent)
        self.api_headers['user-agent'] = self.user_agent



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

        return r.json()

