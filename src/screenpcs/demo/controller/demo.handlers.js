const Demo = require("./demo.controller");
const Const = require("../../../common/const")
function handleDemoListProduct(socket, data) {
     Demo.list(data, (res)=>{
         socket.emit(Const.demoListProduct, res);
     })
}

function handleDemoCreateProduct(socket, data) { 
    Demo.create(data, (res) => {
        if(res.code > 0) {
            socket.emit(Const.demoListProduct, res);
        } else {
            _io.emit(Const.demoListProduct, res);
        }
    })
    
}

function handleDemoDeleteProduct(socket, data) {
    Demo.delete(data, (res) => {
        if(res.code > 0) {
            socket.emit(Const.demoListProduct, res);
        } else {
            _io.emit(Const.demoListProduct, res);
        }
    })
}

function handleDemoUpdateProduct(socket, data) {
    Demo.update(data, (res) => {
        if(res.code > 0) {
            socket.emit(Const.demoListProduct, res);
        } else {
            _io.emit(Const.demoListProduct, res);
        }
    })
}

module.exports = {
    handleDemoListProduct,
    handleDemoCreateProduct,
    handleDemoDeleteProduct,
    handleDemoUpdateProduct
}