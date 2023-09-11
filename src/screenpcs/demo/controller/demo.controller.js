
const dbCon = require('../../../common/DBConnect');
let Responses = require('../../../common/response');
let Response = Responses.Response
const DemoGetListProcess = require('../process/demoGetListProcess');
exports.list = async (req, callback) => {
    try {
        const demoGetListProcess = new DemoGetListProcess(dbCon.dbDemo);
        await demoGetListProcess.start();
        const session = demoGetListProcess.transaction;
        let res = await demoGetListProcess.listProduct(req,session);
        await demoGetListProcess.commit();
        callback(new Response(0, 'sussess',res));
    } catch (error) {
        callback(new Response(1001, error, null));
    }
}

const DemoCreateProcess = require('../process/demoCreateProcess');
exports.create = async (req, callback) => {
    try {
        const demoCreateProcess = new DemoCreateProcess(dbCon.dbDemo);
        await demoCreateProcess.start();
        const session = demoCreateProcess.transaction;
        let rs = await demoCreateProcess.create(req.data, session);
        await demoCreateProcess.commit();
        if(rs) {
            const demoGetListProcess = new DemoGetListProcess(dbCon.dbDemo);
            await demoGetListProcess.start();
            const session = demoGetListProcess.transaction;
            let res = await demoGetListProcess.listProduct(req,session);
            await demoGetListProcess.commit();
            callback(new Response(0, 'sucess', res));
        } else {
            callback(new Response(1002, "Lỗi Insert", null));
        }
    } catch (error) {
        callback(new Response(1001, error, null));
    }
}

const DemoUpdateProcess = require('../process/demoUpdateProcess');
exports.update = async (req, callback) => {
    try {
        const demoUpdateProcess = new DemoUpdateProcess(dbCon.dbDemo);
        await demoUpdateProcess.start();
        const session = demoUpdateProcess.transaction;
        let rs = await demoUpdateProcess.update(req.data,session);
        await demoUpdateProcess.commit();
        if(rs) {
            const demoGetListProcess = new DemoGetListProcess(dbCon.dbDemo);
            await demoGetListProcess.start();
            const session = demoGetListProcess.transaction;
            let res = await demoGetListProcess.listProduct(req,session);
            await demoGetListProcess.commit();
            callback(new Response(0, 'sucess', res));
        } else {
            callback(new Response(1002, "Lỗi Update", null));
        }
    } catch (error) {
        callback(new Response(1001, error, null));
    }
}

const DemoDeleteProcess = require('../process/demoDeleteProcess');
exports.delete = async (req, callback) => {
    try {
        const demoDeleteProcess = new DemoDeleteProcess(dbCon.dbDemo);
        await demoDeleteProcess.start();
        const session = demoDeleteProcess.transaction;
        let rs = await demoDeleteProcess.delete(req.data,session);
        await demoDeleteProcess.commit();
        if(rs) {
            const demoGetListProcess = new DemoGetListProcess(dbCon.dbDemo);
            await demoGetListProcess.start();
            const session = demoGetListProcess.transaction;
            let res = await demoGetListProcess.listProduct(req,session);
            await demoGetListProcess.commit();
            callback(new Response(0, 'sucess', res));
        } else {
            callback(new Response(1002, "Lỗi delete", null));
        }
    } catch (error) {
        callback(new Response(1001, error, null));
    }
}