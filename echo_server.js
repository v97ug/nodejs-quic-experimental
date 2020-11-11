const { createQuicSocket } = require('net');
 const fs = require('fs');
 
 const key  = fs.readFileSync('./ssl_certs/server.key');
 const cert = fs.readFileSync('./ssl_certs/server.crt');
 const ca   = fs.readFileSync('./ssl_certs/server.csr');
 const port = 1234;
 
 // Create the QUIC UDP IPv4 socket bound to local IP port 1234
 const server = createQuicSocket({ endpoint: { port } });
 
 // Tell the socket to operate as a server using the given
 // key and certificate to secure new connections, using
 // the fictional 'hello' application protocol.
 server.listen({ key, cert, alpn: 'hello' });
 
 server.on('session', (session) => {
   // The peer opened a new stream!
   session.on('stream', (stream) => {
     // Echo server
     // stream.pipe(stream);
     console.log('requested!!');

     // stream.on('initialHeaders', (rawHeaders) => {
      // const headers = new Map(rawHeaders);
      // console.log(rawHeaders);
    // });
    stream.setEncoding('utf8');
    stream.on('data', console.log); // データを受け取ったとき
    stream.on('end', () => console.log('stream ended')); // ストリームが終了したとき
   });
 });
 
 server.on('listening', () => {
   // The socket is listening for sessions!
   console.log(`listening on ${port}...`);
 });
 
 // const socket = createQuicSocket({
 //   client: {
 //     key,
 //     cert,
 //     ca,
 //     requestCert: true,
 //     alpn: 'h3-29',
 //     servername: 'localhost'
 //   }
 // });
 
 // const req = socket.connect({
 //   address: 'localhost',
 //   port,
 // });
 
 // req.on('secure', () => {
 //   const stream = req.openStream();
 //   // stdin -> stream
 //   process.stdin.pipe(stream);
 //   stream.on('data', (chunk) => console.log('client(on-secure): ', chunk.toString()));
 //   stream.on('end', () => console.log('client(on-secure): end'));
 //   stream.on('close', () => {
 //     // Graceful shutdown
 //     socket.close();
 //   });
 //   stream.on('error', (err) => console.error(err));
 // });