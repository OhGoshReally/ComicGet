import json
import re
import os
import configparser

from web import web

baseurl = "https://kitsu.io/api/edge/manga?filter[text]="

if __name__ == '__main__':
    basepath = os.path.abspath(os.getcwd())
    web.run()
