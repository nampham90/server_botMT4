const Demo = require("../screenpcs/demo/controller/demo.controler")
class SocketServices{
    //connection socket
    connection( socket ){
        console.log(`User connect id is ${socket.id}`)
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })

        // event on here

        socket.on('chat message', msg => {
            console.log(`msg is:::${msg}`)
            socket.broadcast.emit('chat message', "server send :" + msg);
        })

        socket.on('DemoListProduct', Demo.list);

        
        socket.on('DemoCreatePorduct', Demo.create)

        // on room..
    }
}

module.exports = new SocketServices();