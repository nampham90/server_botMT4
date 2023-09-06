var app = require('../server');
const SocketServices = require('../socketService/socket.service')
var debug = require('debug')('demo-node-js:server');
var http = require('http');
const dotenv = require('dotenv');
const Constant = require('../common/const');
dotenv.config();
const cors = require('cors')
var port = normalizePort(process.env.PORT || '3006');
var server = require("http").Server(app);
var io = require('socket.io')(server, {
  path: "/socket.io",
  cors: {
    origin: "http://nanp.themenew.net",
    methods: ["GET", "POST"],
    credentials: true
  }
});

global._io = io;

const authSocketMiddleware = require('../middlewares/verifyTokenSocket');

global._io.use((socket,next)=> {
  authSocketMiddleware(socket,next);
})

global._io.on('connection', SocketServices.connection)
app.use(cors());
server.listen(port, ()=>{console.log("server open post:"+ port)});


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
