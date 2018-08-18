

class BaseIndexer:
    user_agent = 'ComicGet Generic'

    def __init__(self, user_agent = None):
        if (user_agent != None):
            self.user_agent = user_agent

    def top(self):
        pass

    def search(self, text_string=None, genre_list=None, limit=None, offset=None):
        pass
