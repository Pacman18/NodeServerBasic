'use strict';

console.log("hello world");

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  console.log('HTTP 요청 수신');
  res.end('OK — HTTP 서버 동작 중\n');
});

const PORT = 8443;
const HEARTBEAT_MS = 3000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 에서 대기 중`);
  setInterval(testfunction, HEARTBEAT_MS);
});

function testfunction() {
  console.log('서버 동작 중');
}
