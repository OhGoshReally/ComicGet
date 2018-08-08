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

    #@cherrypy.expose
    #def Search(self, name=None):
    #    if name:
    #        search = re.sub(r'[ ]', "%20", name)

    #        searchurl = baseurl + search
    #        response = requests.get(searchurl)
    #        json_data = json.loads(response.text)
    #        resultnum = len(json_data['data'])

    #        if resultnum > 0:

    #            results = "<h1>Found %s results.</h1>" % resultnum

    #            results = results + "<ul>"

    #            for tophits in json_data['data']:
    #                results = results + "<li>" + tophits['attributes']['canonicalTitle'] + "</li>"
                
    #            results = results + "</ul>"

    #            results = results + "<h3>Showing information about best match:</h3>"

    #            results = results + "<div>"

    #            results = results + '<div><img src="' + json_data['data'][0]['attributes']['posterImage']['small'] + '"></div>'

    #            results = results + '<div><h4>Title:</h4><p>' + json_data['data'][0]['attributes']['canonicalTitle'] + "</p></div>"
    #            results = results + '<div><h4>Published:</h4><p>' + json_data['data'][0]['attributes']['startDate'] + "</p></div>"
    #            results = results + '<div><h4>Rating:</h4><p>' + json_data['data'][0]['attributes']['averageRating'] + "</p></div>"

    #            catlink = json_data['data'][0]['relationships']['categories']['links']['related']
    #            response2 = requests.get(catlink)
    #            json_data2 = json.loads(response2.text)

    #            results = results + "<div><h4>Genres:</h4>"

    #            for category in json_data2['data']:
    #                results = results + "<p>" + category['attributes']['title'] + "</p>"
                
    #            results = results + "</div>"

    #            results = results + "<div><h4>Status:</h4><p>" + json_data['data'][0]['attributes']['status'] + "</p></div>"
    #            results = results + "<div><h4>Synopsis:</h4><p>" + json_data['data'][0]['attributes']['synopsis'] + "</p></div>"

    #            results = results + "</div>"

    #            return results

    #        else:
    #            results = "<h1>Found %s results.</h1>" % resultnum
    #            results = results + "<p>Try searching for something else.</p>"

    #            return results


    #    else:
    #        if name is None:
    #            return 'Please enter your name <a href="./">here</a>.'
    #        else:
    #            return 'No, really, enter your name <a href="./">here</a>.'


conf = os.path.join(os.path.dirname(__file__), 'settings.conf')
#path   = os.path.abspath(os.path.dirname(__file__))

if __name__ == '__main__':
    # CherryPy always starts with app.root when trying to map request URIs
    # to objects, so we need to mount a request handler root. A request
    # to '/' will be mapped to HelloWorld().index().
    cherrypy.quickstart(WelcomePage(), '/', config=conf)
