const http = require('http');
const os = require('os');

// Config
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Helper function
const sendResponse = (res, statusCode, data, contentType = 'application/json') => {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(contentType === 'application/json' ? JSON.stringify(data) : data);
};

// Server
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.url === '/') {
    sendResponse(res, 200, {
      message: 'CI/CD Pipeline Working Successfully 🚀',
      status: 'success'
    });

  } else if (req.url === '/health') {
    sendResponse(res, 200, {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date()
    });

  } else if (req.url === '/info') {
    sendResponse(res, 200, {
      hostname: os.hostname(),
      platform: os.platform(),
      cpu: os.cpus().length,
      memory: `${Math.round(os.totalmem() / (1024 * 1024))} MB`
    });

  } else {
    sendResponse(res, 404, { error: 'Route not found' });
  }
});

// Start server
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
