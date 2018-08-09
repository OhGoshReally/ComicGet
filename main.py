import json
import re
import os
import cherrypy
import configparser

import web

baseurl = "https://kitsu.io/api/edge/manga?filter[text]="

if __name__ == '__main__':
    basepath = os.path.abspath(os.getcwd())
    cherrypy_config = os.path.join(basepath,'config/cherrypy.conf')

    web = web.Web_Handler(os.path.normpath(cherrypy_config))
    web.start_web()
