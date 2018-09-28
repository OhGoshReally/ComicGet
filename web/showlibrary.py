import json
from db import database as p
from datetime import datetime
from playhouse.shortcuts import model_to_dict

class ShowLibrary():

    def showlib(self, text_string=None):

        allcomics = {}
        i = 0
        for c in p.Comic.select():
            allcomics[i] = json.JSONDecoder().decode(json.dumps(model_to_dict(c, backrefs=True), default=str))
            i += 1


        return allcomics