
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
        // const listDemoProcess = new ListDemoProcess(dbCon.dbDemo);
        // const session1 = listDemoProcess.transaction;
        // let lst = await listDemoProcess.getlist("",session1);
        // await listDemoProcess.commit();
        _io.emit('DemoCreatePorduct',detail);
    } catch (error) {
        _io.emit('DemoCreatePorduct', error)
    }
}

exports.list = async () => {
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