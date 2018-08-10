from http.server import HTTPServer, BaseHTTPRequestHandler
import os

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




def run(server_class=HTTPServer, handler_class=rhandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()

