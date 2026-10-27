/**
 * Student Information Web Server
 * Built using Node.js core modules only: http, fs, url, path
 * No external frameworks (no Express, no React).
 */

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'students.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

// ---------- Helper functions ----------

function readStudents(callback) {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return callback(err);
    try {
      const students = JSON.parse(data || '[]');
      callback(null, students);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
}

function writeStudents(students, callback) {
  fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), 'utf8', callback);
}

function sendJSON(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function getRequestBody(req, callback) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
    // Basic protection against huge payloads
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });
  req.on('end', () => {
    if (!body) return callback(null, {});
    try {
      const parsed = JSON.parse(body);
      callback(null, parsed);
    } catch (err) {
      callback(err);
    }
  });
}

// Serve static files from /public (simple UI)
function serveStaticFile(req, res, pathname) {
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(PUBLIC_DIR, filePath);

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  const extname = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

// ---------- Request handler ----------

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // URL module in use
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // ----- API Routes -----
  if (pathname === '/api/students' && method === 'GET') {
    // Support optional query filtering: /api/students?department=CSE&year=2
    readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { error: 'Failed to read student data' });

      let result = students;
      const { department, year, search } = parsedUrl.query;

      if (department) {
        result = result.filter(
          (s) => s.department.toLowerCase() === department.toLowerCase()
        );
      }
      if (year) {
        result = result.filter((s) => String(s.year) === String(year));
      }
      if (search) {
        const term = search.toLowerCase();
        result = result.filter((s) => s.name.toLowerCase().includes(term));
      }

      sendJSON(res, 200, result);
    });
    return;
  }

  // Get single student by ID: /api/students/1
  const singleStudentMatch = pathname.match(/^\/api\/students\/(\d+)$/);
  if (singleStudentMatch && method === 'GET') {
    const id = parseInt(singleStudentMatch[1], 10);
    readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { error: 'Failed to read student data' });
      const student = students.find((s) => s.id === id);
      if (!student) return sendJSON(res, 404, { error: 'Student not found' });
      sendJSON(res, 200, student);
    });
    return;
  }

  if (pathname === '/api/students' && method === 'POST') {
    getRequestBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { error: 'Invalid JSON body' });

      const { name, age, department, year, email } = body;
      if (!name || !age || !department || !year || !email) {
        return sendJSON(res, 400, {
          error: 'Missing required fields: name, age, department, year, email',
        });
      }

      readStudents((err, students) => {
        if (err) return sendJSON(res, 500, { error: 'Failed to read student data' });

        const newId =
          students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

        const newStudent = {
          id: newId,
          name,
          age: Number(age),
          department,
          year: Number(year),
          email,
        };

        students.push(newStudent);

        writeStudents(students, (err) => {
          if (err) return sendJSON(res, 500, { error: 'Failed to save student' });
          sendJSON(res, 201, newStudent);
        });
      });
    });
    return;
  }

  if (singleStudentMatch && method === 'PUT') {
    const id = parseInt(singleStudentMatch[1], 10);
    getRequestBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { error: 'Invalid JSON body' });

      readStudents((err, students) => {
        if (err) return sendJSON(res, 500, { error: 'Failed to read student data' });

        const index = students.findIndex((s) => s.id === id);
        if (index === -1) return sendJSON(res, 404, { error: 'Student not found' });

        const existing = students[index];
        const updated = {
          ...existing,
          ...body,
          id: existing.id, // id is immutable
        };
        if (updated.age) updated.age = Number(updated.age);
        if (updated.year) updated.year = Number(updated.year);

        students[index] = updated;

        writeStudents(students, (err) => {
          if (err) return sendJSON(res, 500, { error: 'Failed to update student' });
          sendJSON(res, 200, updated);
        });
      });
    });
    return;
  }

  if (singleStudentMatch && method === 'DELETE') {
    const id = parseInt(singleStudentMatch[1], 10);
    readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { error: 'Failed to read student data' });

      const index = students.findIndex((s) => s.id === id);
      if (index === -1) return sendJSON(res, 404, { error: 'Student not found' });

      const removed = students.splice(index, 1)[0];

      writeStudents(students, (err) => {
        if (err) return sendJSON(res, 500, { error: 'Failed to delete student' });
        sendJSON(res, 200, { message: 'Student deleted', student: removed });
      });
    });
    return;
  }

  // ----- Static file serving (UI) -----
  if (method === 'GET') {
    serveStaticFile(req, res, pathname);
    return;
  }

  // Fallback
  sendJSON(res, 405, { error: 'Method not allowed' });
});

server.listen(PORT, () => {
  console.log(`✅ Student Information Server running at http://localhost:${PORT}`);
  console.log(`📁 Data file: ${DATA_FILE}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});
