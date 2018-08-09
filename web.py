import os
import os.path

import json

import cherrypy

class Web(object):
    """Web class"""
    conf = None
    indexfile = "html/index.html"

    def __init__(self, global_config=None):
        if global_config is not None:
            self.conf = global_config


    @cherrypy.expose
    def index(self):
        cherrypy.log("Im here")
        return open(self.indexfile)


@cherrypy.expose
class Api(object):

    @cherrypy.tools.accept(media='text/plain')
    def GET(self):
        cherrypy.log("Trying to return the fucking get, pls help")
        #data = {'status': 'ok'}
        #return json.dumps(data)
        return "hello"



class Web_Handler(object):
    """Web handler"""
    conf = None
    api_config = {
        ':': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.sessions.on': True,
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
        }
    }

    def __init__(self, cherrypy_config=None):
        if cherrypy_config is not None:
            self.conf = cherrypy_config
    
    def start_web(self):
        cherrypy.tree.mount(Api(), '/api', self.api_config)
        cherrypy.tree.mount(Web(), '/', self.conf)

        cherrypy.engine.start()
        cherrypy.engine.block()