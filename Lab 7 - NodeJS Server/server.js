// 1. Import necessary modules
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Middleware: log incoming requests to the console
function logRequest(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
}

// Map file extensions to content types
function getContentType(ext) {
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

// Handles each request: resolves file path, reads file, sends response
function handleRequest(req, res) {
  // 2. Construct file path based on request URL
  let filePath;

  // 3. If URL is root or index.html, set path to public/index.html
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'public', 'index.html');
  }
  // 4. If URL is about.html, set path to public/about.html
  else if (req.url === '/about.html') {
    filePath = path.join(__dirname, 'public', 'about.html');
  }
  // Otherwise treat as unknown/invalid route
  else {
    filePath = null;
  }

  // If route is not recognized, immediately return 404
  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1>');
    return;
  }

  // 5. Read file asynchronously
  fs.readFile(filePath, (err, content) => {
    // 6. If file not found (error), return 404 response
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return;
    }

    // 7. Determine file extension and set content type accordingly
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);

    // 8. Write 200 OK header with appropriate content type
    res.writeHead(200, { 'Content-Type': contentType });

    // 9. Send file content as response using binary encoding
    res.end(content, 'binary');
  });
}

// 10. Create an HTTP server instance using http.createServer()
const server = http.createServer((req, res) => {
  // Run logging middleware first, then handle the request
  logRequest(req, res, () => {
    handleRequest(req, res);
  });
});

// 11. Handle server errors and log error messages
server.on('error', (err) => {
  console.error('Server error:', err.message);
});

// 12. Server listens on port 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});