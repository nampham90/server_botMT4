const Demo = require("../screenpcs/demo/controller/demo.controler")
class SocketServices{
    //connection socket
    connection( socket ){
        console.log(`User connect id is ${socket.userID}`)
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.userID}`);
        })

        // on Demo
        socket.on('DemoListProduct',Demo.list);
        socket.on('DemoCreatePorduct', Demo.create);
        socket.on('DemoDeletePorduct', Demo.delete);
        socket.on('DemoUpdatePorduct', Demo.update);

        // on room..
    }
}

module.exports = new SocketServices();