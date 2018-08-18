import os
import requests

class BaseIndexer:
    user_agent = 'ComicGet Generic'
    indexer_id = 'BASE'

    def __init__(self, user_agent = None):
        if (user_agent != None):
            self.user_agent = user_agent

    def top(self):
        pass

    def search(self, text_string=None, genre_list=None, limit=None, offset=None):
        pass

    def get_id(self):
        return self.indexer_id


class BaseCacher:
    user_agent = 'ComicGet Generic'
    indexer_id = 'BASE'
    cache_dir = None


    def get_id(self):
        return self.indexer_id


    def set_cache(self, directory):
        if directory != None and os.access(directory, os.W_OK):
            self.cache_dir = directory


    def get_cached(self, path):
        if not self.cache_dir:
            return None
        path = os.path.join(self.cache_dir, path)
        print('Checking if (%s) is file' % path)
        if os.path.isfile(path):
            print('It is')
            return path
        print('It isn`t')
        return None

    
    def is_cached(self, path):
        print('Checking if "%s" is cached' % path)
        if self.get_cached(path) == None:
            print('It`s not cached')
            return False
        print('It`s cached')
        return True
        
    
    def cache(self, path, link):
        path = os.path.join(self.cache_dir, path)
        r = requests.get(link, stream=True)

        if not r.ok:
            return False

        if not os.path.exists(os.path.dirname(path)):
            os.makedirs(os.path.dirname(path))

        try:
            with open(path, 'wb') as f:
                for block in r.iter_content(1024):
                    f.write(block)
        except IOError as e:
            print("Could not open file for writing: (%s)" % e)
            return False

        return True


    def get(self, link):
        if not self.cache_dir:
            return None
        if link.startswith("http"):
            splits = 3
        else:
            splits = 1
        path = '/'.join(link.split('/')[splits:])
        res = self.get_cached(path)
        if not res:
            if not self.cache(path, link):
                return None
        return path
        
