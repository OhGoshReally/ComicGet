import json
import requests
import re
import os, os.path
import cherrypy

baseurl = "https://kitsu.io/api/edge/manga?filter[text]="

class WelcomePage:

    @cherrypy.expose
    def index(self):        
        return open('index.html')

conf = os.path.join(os.path.dirname(__file__), 'settings.conf')

if __name__ == '__main__':
    cherrypy.quickstart(WelcomePage(), '/', config=conf)
