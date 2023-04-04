var app = require('../server');
var debug = require('debug')('demo-node-js:server');
var http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
var port = normalizePort(process.env.PORT || '3000');
var server = require("http").Server(app);
var io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4205",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
app.use(cors());
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('client-send-data', (msg) => {
      console.log(msg);
      io.sockets.emit('server-send-data', msg);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});
server.listen(port, ()=>{console.log("server open post:"+ port)});


//app.set('port', port);

//var server = http.createServer(app);

//server.listen(port,() => {
  //  console.log("server open port " + port);
//});
//server.on('error', onError);
//server.on('listening', onListening);


function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
