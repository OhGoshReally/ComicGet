from http.server import HTTPServer, BaseHTTPRequestHandler
import os
import json

from indexers import kitsu
from web import postadd
from web import postremove
from web import postsettings
from web import getentry
from web import showlibrary

class rhandler(BaseHTTPRequestHandler):

    def _set_headers(self, code=200, header={'keyword': 'Content-type', 'value': 'text/html'}):
        self.send_response(200)
        self.send_header(**header)
        self.end_headers()

    def do_GET(self):
        command = {
            "":  self._index,
            "index.html":  self._index,
            "static": self._serve_static,
            "search": self._search,
            "add": self._add,
            "remove": self._remove,
            "settings": self._settings,
            "get": self._get,
            "show": self._show,
        }
        func = command.get(self.path.split('/')[1], self._404)
        func(self.path.split('/')[2:])


    def do_HEAD(self):
        self._set_headers()

    def _index(self, local_path):
        self._serve_file_or_404("./html/index.html")

    def _404(self, local_path):
        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"<!DOCTYPE html><html><body><h1>404</h1><p>This is the 404 page, sorry.</p></body></html>")

    def _serve_static(self, local_path=None, static_directory="./html"):
        if not local_path:
            file_path = self.path
        active_file = os.path.join(os.path.abspath(os.getcwd()), static_directory, '/'.join(local_path))
        active_file = os.path.normpath(active_file)
        self._serve_file_or_404(active_file)

    def _serve_file_or_404(self, file_path):
        content_header = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "javascript",
        }
        if (os.path.isfile(file_path)):
            _, ext = os.path.splitext(file_path)
            self._set_headers(header={"keyword": "Content-type", "value": content_header.get(ext, "text/html")})
            with open(file_path, "rb") as f:
                self.wfile.write(f.read())
        else:
            self._404(file_path)

    def _search(self, search):
        self._set_headers(header={'keyword':'Content-type', 'value': 'application/json'})
        indexer = kitsu.KitsuIndexer()
        indexer.create_cache()
        cache_dir = os.path.join('cache', indexer.get_cacher().get_id())
        if not os.path.exists(cache_dir):
            os.makedirs(cache_dir)
        indexer.get_cacher().set_cache(cache_dir)
        js = json.dumps(indexer.search(text_string=search))
        self.wfile.write(js.encode())
    
    def _add(self, add):
        self._set_headers(header={'keyword':'Content-type', 'value': 'text/html'})
        addone = postadd.Add()
        addone.addcomic(text_string=add)
        self.wfile.write(b"<h2>NOICE</h2>")
    
    def _remove(self, remove):
        self._set_headers(header={'keyword':'Content-type', 'value': 'text/html'})
        removeone = postremove.Remove()
        removeone.removecomic(text_string=remove)
        self.wfile.write(b"<h2>NOICE</h2>")

    def _settings(self, settings):
        self._set_headers(header={'keyword':'Content-type', 'value': 'text/html'})
        newsetting = postsettings.Settings()
        newsetting.changesettings(text_string=settings)
        self.wfile.write(b"<h2>NOICE</h2>")

    def _get(self, get):
        self._set_headers(header={'keyword':'Content-type', 'value': 'application/json'})
        gettheentry = getentry.GetEntry()
        woah = json.dumps(gettheentry.getdbentry(text_string=get))
        self.wfile.write(woah.encode())
    
    def _show(self, show):
        self._set_headers(header={'keyword':'Content-type', 'value': 'application/json'})
        showthelibrary = showlibrary.ShowLibrary()
        showem = json.dumps(showthelibrary.showlib(text_string=show))
        self.wfile.write(showem.encode())


def run(server_class=HTTPServer, handler_class=rhandler, port=8080):
    print("Starting webserver")
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()

