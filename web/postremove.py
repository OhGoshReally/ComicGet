#!/usr/bin/python

import os
import shutil
from db import database as p

class Remove():

    def removecomic(self, text_string=None):
        if (text_string != None):

            userinput = str(text_string[0])

            ############# VARIABLES #############

            metadatabase = './html/library/img/'
            filepathbase = '/home/dan/fakepath/'

            ############# START #############

            print("Removing comic " + userinput)

            fileDir = os.path.dirname(os.path.realpath('__file__'))

            delentry = p.Comic.select().where(p.Comic.id == userinput).get()
            delentry.delete_instance(recursive=True, delete_nullable=True)

            imgdir = os.path.join(fileDir, metadatabase + userinput)
            imgdir = os.path.abspath(os.path.realpath(imgdir))

            print("Removing cache for comic", userinput)

            if os.path.exists(imgdir):
                shutil.rmtree(imgdir)

            print("Done - Database updated")