import json
from db import database as p
from datetime import datetime
from playhouse.shortcuts import model_to_dict

class GetEntry():

    def getdbentry(self, text_string=None):
        
        userinput = str(text_string[0])
        entry = p.Comic.get(p.Comic.id == userinput)
        entry_json = json.JSONDecoder().decode(json.dumps(model_to_dict(entry, backrefs=True), default=str))

        return entry_json