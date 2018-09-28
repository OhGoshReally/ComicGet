#!/usr/bin/python

import json
from db import database as p

class Settings():

    def changesettings(self, text_string=None):
        if (text_string != None):
            
            settingkey = str(text_string[0])
            settingvalue = str(text_string[1])

            print("Changing setting", settingkey, "to", settingvalue)

            setting = p.Config.select().where(p.Config.key == settingkey).get()
            setting.value = settingvalue
            silentset = setting.save()

            print("Done - Database updated")