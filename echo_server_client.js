const { createQuicSocket } = require('net');
const fs = require('fs');
const key  = fs.readFileSync('./ssl_certs/server.key');
const cert = fs.readFileSync('./ssl_certs/server.crt');
const ca   = fs.readFileSync('./ssl_certs/server.csr');
const port = 1234;
 
 let socket = createQuicSocket({
   client: {
     key,
     cert,
     ca,
     requestCert: true,
     alpn: 'h3-29',
     servername: 'localhost'
   }
 });

 let req = socket.connect({
   address: 'localhost',
   port
 });

req.on('secure', () => {
  console.log('何か入力してください');
   const stream = socket.connect({
   address: 'localhost',
   port,
   }).openStream();
   // stdin -> stream
   process.stdin.pipe(stream);
   stream.on('close', () => {
     // Graceful shutdown
     socket.close();
   });
 });
