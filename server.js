const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.env.PORT || process.argv[2] || 3000);
const root = __dirname;
const publicFiles = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']]
]);

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = publicFiles.get(pathname);

  if (!file) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  fs.readFile(path.join(root, file[0]), (error, body) => {
    if (error) {
      response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Unable to load the site');
      return;
    }

    response.writeHead(200, {
      'content-type': file[1],
      'cache-control': pathname === '/' || pathname.endsWith('.html')
        ? 'no-cache'
        : 'public, max-age=3600',
      'x-content-type-options': 'nosniff'
    });
    response.end(body);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Custom Website Studio listening on port ${port}`);
});

