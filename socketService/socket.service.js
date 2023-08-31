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

        socket.on('DemoListProduct', req=> {
            console.log('server on DemoListProduct');
            let proList = [
                {
                    'idpro': 1,
                    'proname': 'iphone',
                    'price': 1200,
                    'completed': true
                },
                {
                    'idpro': 2,
                    'proname': 'samsung',
                    'price': 1000,
                    'completed': true
                },
                {
                    'idpro': 3,
                    'proname': 'mac',
                    'price': 1500,
                    'completed': true
                },
            ]
            socket.broadcast.emit('DemoListProduct', proList);
        })

        // on room..
    }
}

module.exports = new SocketServices();