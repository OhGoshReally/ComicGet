#!/usr/bin/python

import json
import os
import shutil

class Remove():

    def removecomic(self, text_string=None):
        if (text_string != None):
            userinput = str(text_string[0])

            print("Removing comic " + userinput)

            fileDir = os.path.dirname(os.path.realpath('__file__'))
            filename = os.path.join(fileDir, './html/library/list.json')
            filename = os.path.abspath(os.path.realpath(filename))

            with open(filename) as f:
                jsondb = json.load(f)

            del jsondb[userinput]

            with open(filename, 'w') as outfile:
                json.dump(jsondb, outfile)

            imgdir = os.path.join(fileDir, './html/library/img/' + userinput)
            imgdir = os.path.abspath(os.path.realpath(imgdir))

            print("Removing cache for " + userinput)

            if os.path.exists(imgdir):
                shutil.rmtree(imgdir)
