const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response

// process
const Tmt050getListKBNProcess = require("../process/tmt050Process/tmt050getListKBNProcess");
const Spin00901DetailProcess = require("../process/spin00901Process/spin00901DetailProcess");
const Spin00901UpdateProcess = require("../process/spin00901Process/spin00901UpdateProcess");
const Spin00901DelProcess = require("../process/spin00901Process/spin00901DelProcess");

exports.getListKBN = async (req,res) => {
    try {
        const tmt050getListKBNProcess = new Tmt050getListKBNProcess(dbCon.dbDemo);
        await tmt050getListKBNProcess.start();
        const session = tmt050getListKBNProcess.transaction;
        let response = await tmt050getListKBNProcess.getListKBN(req.body,session);
        await tmt050getListKBNProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.getDetail = async (req,res) => {
    try {
        const spin00901DetailProcess = new Spin00901DetailProcess(dbCon.dbDemo);
        await spin00901DetailProcess.start();
        const session = spin00901DetailProcess.transaction;
        let response = await spin00901DetailProcess.getDetail(req.body,session);
        await spin00901DetailProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.update = async (req,res) => {
    try {
        const spin00901UpdateProcess = new Spin00901UpdateProcess(dbCon.dbDemo);
        await spin00901UpdateProcess.start();
        const session = spin00901UpdateProcess.transaction;
        let response = await spin00901UpdateProcess.update(req.body,session);
        await spin00901UpdateProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.delete = async (req,res) => {
    try {
        const spin00901DelProcess = new Spin00901DelProcess(dbCon.dbDemo);
        await spin00901DelProcess.start();
        const session = spin00901DelProcess.transaction;
        let response = await spin00901DelProcess.delete(req.body,session);
        await spin00901DelProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

