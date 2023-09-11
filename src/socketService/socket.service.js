const Const = require("../common/const")
const DemoHandlers = require("../screenpcs/demo/controller/demo.handlers");
class SocketServices{
    //connection socket
    connection( socket ){
        console.log(`User connect id is ${socket.userID}`)
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.userID}`);
        })

        // on demo
        socket.on(Const.demoListProduct, (req) => {DemoHandlers.handleDemoListProduct(socket,req)});
        socket.on(Const.demoCreateProduct, (req) => {DemoHandlers.handleDemoCreateProduct(socket,req)});
        socket.on(Const.demoDeleteProduct, (req) => {DemoHandlers.handleDemoDeleteProduct(socket,req)});
        socket.on(Const.demoUpdateProduct, (req) => {DemoHandlers.handleDemoUpdateProduct(socket,req)});


        // on chat

        // on 
    }
}

module.exports = new SocketServices();