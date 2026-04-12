'use strict';

console.log("hello world");

const http = require('http');
const socket = require('socket.io');
const santadb = require('./TestDB/santadb');

console.log(santadb.getTestnumber());

(async () => {
  await santadb.init();
  console.log('DB connected');

  const user = await santadb.findByUserID(10);
  console.log(user);

  const users = await santadb.findAll();
  console.log(users);

  const csharpUser = santadb.toCSharpSantaUser(user);
  console.log(csharpUser);

})();

// DB는 서버와 별도 터미널에서 확인: npm run db:check  (또는 node TestDB/check-user.js)

// http 서버 코드
/*const server = http.createServer((req, res) => {
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

const server = http.createServer();
const port = 11100;

var io = socket(server, {
  pingInterval: 10000,
  pingTimeout: 5000
});

io.use((socket, next) => {
  if (socket.handshake.query.token === "UNITY") {
      next();
  } else {
      next(new Error("Authentication error"));
  }
});

io.on('connection', socket => {
console.log('connection');

setTimeout(() => {
  socket.emit('connection', {date: new Date().getTime(), data: "Hello Unity"})
}, 1000);

socket.on('hello', (data) => {
  console.log('hello', data);
  socket.emit('hello', {date: new Date().getTime(), data: data});
});

socket.on('spin', (data) => {
  console.log('spin');
  socket.emit('spin', {date: new Date().getTime(), data: data});
});

socket.on('class', (data) => {
  console.log('class', data);
  socket.emit('class', {date: new Date().getTime(), data: data});
});
});




server.listen(port, () => {
console.log('listening on *:' + port);
});*/

