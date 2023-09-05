
const dbCon = require("../../../common/DBConnect");
const DemoProcess = require("../process/demoProcess");
const ListDemoProcess = require("../process/listDemoProcess");

exports.create = async (product) => {
    
    try {
        const demoProcess = new DemoProcess(dbCon.dbDemo);
        await demoProcess.start();
        const session = demoProcess.transaction;
        let detail = await demoProcess.create(product,session);
        await demoProcess.commit();
        _io.emit('DemoCreatePorduct',detail);
    } catch (error) {
        _io.emit('DemoCreatePorduct', error)
    }
}

exports.list = async (user) => {
    try {
        const listDemoProcess = new ListDemoProcess(dbCon.dbDemo);
        await listDemoProcess.start();
        const session1 = listDemoProcess.transaction;
        let lst = await listDemoProcess.getlist("",session1);
        await listDemoProcess.commit();
        _io.emit('DemoListProduct',lst);
    } catch (error) {
        _io.emit('DemoListProduct',error);
    }
}

const DemoDeleteProcess = require("../process/demoDeleteProcess");
exports.delete = async (id) => {
    try {
        const demoDeleteProcess = new DemoDeleteProcess(dbCon.dbDemo);
        await demoDeleteProcess.start()
        const session = demoDeleteProcess.transaction;
        let resid = await demoDeleteProcess.delete(id, session);
        await demoDeleteProcess.commit();
        _io.emit("DemoDeletePorduct",resid);
    } catch (error) {
        _io.emit("DemoDeletePorduct",error);
    }
}

const DemoUpdateProcess = require("../process/demoUpdateProcess");
exports.update = async (detail) => {
    try {
        const demoUpdateProcess = new DemoUpdateProcess(dbCon.dbDemo);
        await demoUpdateProcess.start();
        const session = demoUpdateProcess.transaction;
        let resDetail = await demoUpdateProcess.update(detail,session);
        await demoUpdateProcess.commit();
        _io.emit("DemoUpdatePorduct",resDetail);
    } catch (error) {
        _io.emit("DemoUpdatePorduct",error);
    }
}