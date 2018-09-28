#!/usr/bin/python

import json
from db import database as p
from playhouse.shortcuts import model_to_dict

class Settings():

    def showsettings(self, text_string=None):
            
        allsettings = {'settings':{}}
        for c in p.Config.select():
            allsettings['settings'][c.key] = model_to_dict(c)

        return allsettings