
const dbCon = require("../../../common/DBConnect");
const DemoProcess = require("../process/demoProcess");
const ListDemoProcess = require("../process/listDemoProcess");
let Responses = require('../../../common/response');
let Response = Responses.Response
exports.create = async (req) => {
    
    try {
        const demoProcess = new DemoProcess(dbCon.dbDemo);
        await demoProcess.start();
        const session = demoProcess.transaction;
        let rs = await demoProcess.create(req.data,session);
        await demoProcess.commit();
        if(rs) {
            const listDemoProcess = new ListDemoProcess(dbCon.dbDemo);
            await listDemoProcess.start();
            const session1 = listDemoProcess.transaction;
            let res = await listDemoProcess.getlist(req,session1);
            await listDemoProcess.commit();
            _io.emit('DemoListProduct',new Response(0,'sucess',res));
        } else {
            _io.local.emit('DemoListProduct',new Response(1002,'Lỗi insert', null));
        }
    } catch (error) {
        _io.local.emit('DemoListProduct', new Response(1001,error, null));
    }
}

exports.list = async (req) => {
    try {
        const listDemoProcess = new ListDemoProcess(dbCon.dbDemo);
        await listDemoProcess.start();
        const session1 = listDemoProcess.transaction;
        let res = await listDemoProcess.getlist(req,session1);
        await listDemoProcess.commit();
        _io.local.emit('DemoListProduct',new Response(0,'sucess',res));
    } catch (error) {
        _io.local.emit('DemoListProduct',new Response(1001,error, null));
    }
}

const DemoDeleteProcess = require("../process/demoDeleteProcess");
exports.delete = async (req) => {
    try {
        const demoDeleteProcess = new DemoDeleteProcess(dbCon.dbDemo);
        await demoDeleteProcess.start()
        const session = demoDeleteProcess.transaction;
        let resid = await demoDeleteProcess.delete(req.data, session);
        await demoDeleteProcess.commit();
        if(resid !== -1) {
            const listDemoProcess = new ListDemoProcess(dbCon.dbDemo);
            await listDemoProcess.start();
            const session1 = listDemoProcess.transaction;
            let res = await listDemoProcess.getlist(req,session1);
            await listDemoProcess.commit();
            _io.emit('DemoListProduct',new Response(0,'sucess',res));
        } else {
            _io.local.emit('DemoListProduct',new Response(1002,'Lỗi insert', null));
        }
    } catch (error) {
        _io.local.emit('DemoListProduct', new Response(1001,error, null));
    }
}

const DemoUpdateProcess = require("../process/demoUpdateProcess");
exports.update = async (req) => {
    try {
        const demoUpdateProcess = new DemoUpdateProcess(dbCon.dbDemo);
        await demoUpdateProcess.start();
        const session = demoUpdateProcess.transaction;
        let resDetail = await demoUpdateProcess.update(req.data,session);
        await demoUpdateProcess.commit();
        if(resDetail !== null) {
            const listDemoProcess = new ListDemoProcess(dbCon.dbDemo);
            await listDemoProcess.start();
            const session1 = listDemoProcess.transaction;
            let res = await listDemoProcess.getlist(req,session1);
            await listDemoProcess.commit();
            _io.emit('DemoListProduct',new Response(0,'sucess',res));
        } else {
            _io.local.emit('DemoListProduct',new Response(1002,'Lỗi update', null));
        }
    } catch (error) {
        _io.local.emit('DemoListProduct', new Response(1001,error, null));
    }
}