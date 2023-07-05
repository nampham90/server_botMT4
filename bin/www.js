var app = require('../server');
var debug = require('debug')('demo-node-js:server');
var http = require('http');
const dotenv = require('dotenv');
const Constant = require('../common/const');
dotenv.config();

var port = normalizePort(process.env.PORT || '3000');
const cors = require('cors')

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

function UserDetail() {
   this.userId = "";
   this.username = "";
   this.email = "";
}

var lstUserdetail = [];
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('client-send-data', (msg) => {
      console.log(msg);
      io.sockets.emit('server-send-data', msg);
    });

    socket.on('client-register-chat',(userDetail) => {
      console.log(userDetail)
      var checkAdmin = false;
      if(Constant.emailAdmin == userDetail['email']){
         checkAdmin = true;
      }
      if(lstUserdetail.length > 0){
        var check = false;
        for(let element of lstUserdetail) {
          if(element['email'] == userDetail['email']){
            check = true;
            break;
          }
        }
        if(check === true) {
          socket.emit("client-register-chat","1001");
        } else {
          socket.userdetail = userDetail;
          lstUserdetail.push(userDetail);
          if(checkAdmin == true) {
            const listres = lstUserdetail.filter(item => item['email'] !== Constant.emailAdmin); 
            socket.emit("admin-register-chat",listres);
          }
        }
      } else {
        socket.userdetail = userDetail;
        lstUserdetail.push(userDetail);
        if(checkAdmin == true) {
          const listres = lstUserdetail.filter(item => item['email'] !== Constant.emailAdmin); 
          socket.emit("admin-register-chat",listres);
        }
      }
    })

    socket.on('disconnect', () => {
      if(socket.userdetail){
        const index = lstUserdetail.findIndex(item => item['email'] === socket.userdetail['email']); // Tìm vị trí của đối tượng có id là 3 trong mảng
        if (index !== -1) {
          lstUserdetail.splice(index, 1); // Xóa đối tượng có index là index, chỉ xóa 1 đối tượng
        }
        console.log(socket.userdetail['username'] + ' disconnected');
        console.log(lstUserdetail.length);
      } else {
        //lstUserdetail = [];
        console.log('user disconnected');
      }
      
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
