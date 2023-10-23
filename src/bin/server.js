const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server: SocketIOServer } = require('socket.io');
const Routes = require('../routers/index');
const Database = require('../DB/database');
const helmet = require("helmet");
const logger = require('morgan');
const bodyParser = require("body-parser");
const authSocketMiddleware = require('../middlewares/verifyTokenSocket');
const SocketServices = require('../socketService/socket.service')
const handleJsonError = require('../middlewares/verifyJson');
const MenuModel = require('../DB/model/menu');
const Result = require('../common/result/Result');
const { ErrorCode } = require('../common/enums/ErrorCode');

class Server {
    constructor(app) {
        this.app = app;
        this.httpServer = http.createServer(app);
        this.io = new SocketIOServer(this.httpServer, {
            path: "/socket.io/",
            cors: {
                origin: "http://localhost:4201",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        
        this.config();
        new Routes(app);
        this.handerError();
        this.syncDatabase();
        
        global._io = this.io;
        global._io.use((socket,next)=> {
            authSocketMiddleware(socket,next);
        })
    }

    config() {
        const corsOptions = {
            origin: "http://localhost:4201",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
            optionsSuccessStatus: 204
        };

        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use('/public',express.static(path.join(__dirname, '../../public')));
        this.app.use(handleJsonError);
        
    }

    handerError() {
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            next(createError(404));
        });

        // error handler
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 505);
            res.json(Result.failure(ErrorCode.SYS_ERR_HTTP_METHOD_NOT_ALLOWED));
        });
    }

    syncDatabase() {
        const db = new Database();
    //     db.models.sys_menu.findAll({}).then(data => {
    //         console.log(data)
    //    });
        db.connect()
        .then(async() => await db.sync({ alter: true }))
        .then(() => {
            // Bây giờ bạn có thể sử dụng các mô hình User và Role để thao tác với cơ sở dữ liệu
        })
        .catch(error => {
            console.error('Lỗi kết nối cơ sở dữ liệu:', error);
        });
    }

    start(port) {
        this.httpServer.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        global._io.on('connection', SocketServices.connection)

        
    }
}

module.exports = Server;