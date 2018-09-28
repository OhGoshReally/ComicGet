#!/usr/bin/python

import json
import os

class Settings():

    def changesettings(self, text_string=None):
        if (text_string != None):

            fileDir = os.path.dirname(os.path.realpath('__file__'))
            filename = os.path.join(fileDir, './html/settings.json')
            filename = os.path.abspath(os.path.realpath(filename))

            with open(filename) as f:
                jsondb = json.load(f)
            
            argnm = len(text_string)

            print(argnm,"arguments")

            if argnm is 2:
                jsondb[text_string[0]] = str(text_string[1])
            
            if argnm is 3:
                jsondb[text_string[0]][text_string[1]] = str(text_string[2])
            
            if argnm is 4:
                jsondb[text_string[0]][text_string[1]][text_string[2]] = str(text_string[3])
            
            if argnm is 5:
                jsondb[text_string[0]][text_string[1]][text_string[3]][text_string[4]] = str(text_string[4])
            
            print(jsondb)

            with open(filename, 'w') as outfile:
                json.dump(jsondb, outfile)

