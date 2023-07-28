const dbCon = require('../../common/DBConnect');
let Responses = require('../../common/response');
let Response = Responses.Response
let commonfun = require('../../common/functionCommon');

const Spkh00201Ant100getAllProcess = require("../spkh00201Process/spkh00201Ant100getAllProcess");
exports.searchListCongNo = async (req, res, next) => {
    try {
        const spkh00201Ant100getAllProcess = new Spkh00201Ant100getAllProcess(dbCon.dbDemo);
        await spkh00201Ant100getAllProcess.start();
        const session = spkh00201Ant100getAllProcess.transaction;
        req.body.userid = req.userID;
        let response = await spkh00201Ant100getAllProcess.search(req.body,session);
        await spkh00201Ant100getAllProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

const Spkh00201XuatPdfProcess = require("../spkh00201Process/spkh00201XuatPdfProcess");
exports.xuatPdf = async(req,res) => {
    try {
        const spkh00201XuatPdfProcess = new Spkh00201XuatPdfProcess(dbCon.dbDemo);
        await spkh00201XuatPdfProcess.start();
        const session = spkh00201XuatPdfProcess.transaction;
        req.body.userid = req.userID;
        let response = await spkh00201XuatPdfProcess.xuatPdf(req.body, session);
        await spkh00201XuatPdfProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

const Spkh00201ThanhtoanPorcess = require("../spkh00201Process/spkh00201ThanhtoanProcess");
exports.thanhtoan = async (req, res) => {
    try {
        const spkh00201ThanhtoanPorcess = new Spkh00201ThanhtoanPorcess(dbCon.dbDemo);
        await spkh00201ThanhtoanPorcess.start();
        const session = spkh00201ThanhtoanPorcess.transaction;
        req.body.userid = req.userID;
        let response = await spkh00201ThanhtoanPorcess.thanhtoan(req.body,session);
        await spkh00201ThanhtoanPorcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

const Spkh00201HuyThanhtoanProcess = require("../spkh00201Process/spkh00201HuythanhtoanProcess");
exports.huythanhtoan = async (req, res) => {
    try {
        const spkh00201HuyThanhtoanProcess = new Spkh00201HuyThanhtoanProcess(dbCon.dbDemo);
        await spkh00201HuyThanhtoanProcess.start();
        const session = spkh00201HuyThanhtoanProcess.transaction;
        req.body.userid = req.userID;
        let response = await spkh00201HuyThanhtoanProcess.huythanhtoan(req.body, session);
        await spkh00201HuyThanhtoanProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

const Spkh00201PhathanhlaiProcess = require("../spkh00201Process/spkh00201PhathanhlaiProcess") 
exports.phathanhlai = async (req, res) => {
    try {
        const spkh00201PhathanhlaiProcess = new Spkh00201PhathanhlaiProcess(dbCon.dbDemo);
        await spkh00201PhathanhlaiProcess.start();
        const session = spkh00201PhathanhlaiProcess.transaction;
        req.body.userid = req.userID;
        let response = await spkh00201PhathanhlaiProcess.phathanhlai(req.body, session);
        await spkh00201PhathanhlaiProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

const Spkh00201HuyphathanhProcess = require("../spkh00201Process/spkh00201HuyphathanhProcess");
exports.huyphathanh = async (req, res) => {
    try {
        const spkh00201HuyphathanhProcess = new Spkh00201HuyphathanhProcess(dbCon.dbDemo);
        await spkh00201HuyphathanhProcess.start();
        const session = spkh00201HuyphathanhProcess.transaction;
        req.body.userid = req.userID;
        let response = await spkh00201HuyphathanhProcess.huyphathanh(req.body,session);
        await spkh00201HuyphathanhProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}