
const dbCon = require('../../../common/DBConnect');
let Responses = require('../../../common/response');
let Response = Responses.Response
const Result = require("../../../common/result/Result");
const DemoGetListProcess = require('../process/demoGetListProcess');
exports.list = async (req, callback) => {
    try {
        const demoGetListProcess = new DemoGetListProcess(dbCon.dbDemo);
        await demoGetListProcess.start();
        const session = demoGetListProcess.transaction;
        let res = await demoGetListProcess.listProduct(req,session);
        await demoGetListProcess.commit();
        callback(Result.success(res));
    } catch (error) {
        callback(Result.failureCode(ErrorCode.SYS_ERR_SEARCH_FAILED));
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
            callback(Result.success(res));
        } else {
            callback(Result.failureCode(ErrorCode.SYS_ERR_CREATE_FAILED));
        }
    } catch (error) {
        callback(Result.failureCode(ErrorCode.SYS_ERR_GLOBAL));
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
            callback(Result.success(res));
        } else {
            callback(Result.failureCode(ErrorCode.SYS_ERR_UPDATE_FAILED));
        }
    } catch (error) {
        callback(Result.failureCode(ErrorCode.SYS_ERR_GLOBAL));
    }
}

const DemoDeleteProcess = require('../process/demoDeleteProcess');
const { ErrorCode } = require('../../../common/enums/ErrorCode');
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
            callback(Result.success(res));
        } else {
            callback(Result.failureCode(ErrorCode.SYS_ERR_DELETE_FAILED));
        }
    } catch (error) {
        callback(Result.failureCode(ErrorCode.SYS_ERR_GLOBAL));
    }
}