const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
const Tmt060AddProcess = require("../process/tmt060Process/tmt060AddProcess");
const Tmt060getAllProcess = require("../process/tmt060Process/tmt060getAllProcess");
const TMT060getDetailProcess = require("../process/tmt060Process/tmt060getDetailProcess");
const Tmt060UpdateProcess = require("../process/tmt060Process/tmt060UpdateProcess");
const Tmt060DeleteProcess = require("../process/tmt060Process/tmt060DeleteProcess");
exports.getAll = async (req,res) => {
    try {
        const tmt060getAllProcess = new Tmt060getAllProcess(dbCon.dbDemo);
        await tmt060getAllProcess.start();
        const session = tmt060getAllProcess.transaction;
        let response = await tmt060getAllProcess.getAll(req.body, session);
        await tmt060getAllProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.add = async (req,res) => {
    try {
        const tmt060AddProcess = new Tmt060AddProcess(dbCon.dbDemo);
        await tmt060AddProcess.start();
        const session = tmt060AddProcess.transaction;
        let response = await tmt060AddProcess.add(req.body,session);
        await tmt060AddProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }

}

exports.getDetail = async (req, res) => {
    try {
        const tmt060getDetailProcess = new TMT060getDetailProcess(dbCon.dbDemo);
        await tmt060getDetailProcess.start();
        const session = tmt060getDetailProcess.transaction;
        let response = await tmt060getDetailProcess.getDetail(req.body,session);
        await tmt060getDetailProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.delete = async (req, res) => {
    try {
        const tmt060DeleteProcess = new Tmt060DeleteProcess(dbCon.dbDemo);
        await tmt060DeleteProcess.start();
        const session = tmt060DeleteProcess.transaction;
        let response = await tmt060DeleteProcess.delete(req.body,session);
        await tmt060DeleteProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }

}

exports.update = async (req, res) => {
    try {
        const tmt060UpdateProcess = new Tmt060UpdateProcess(dbCon.dbDemo);
        await tmt060UpdateProcess.start();
        const session = tmt060UpdateProcess.transaction;
        let response = await tmt060UpdateProcess.update(req.body,session);
        await tmt060UpdateProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
    
}