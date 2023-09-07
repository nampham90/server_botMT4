const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Screenpc = db.screenpc;
const dbcon = require("../common/DBConnect");
const Const = require('../common/const');
// process
const ScreenpcSearchProcess = require("../process/screenpcProcess/ScreenpcSearchProcess");
const ScreenpcDetailProcess = require("../process/screenpcProcess/ScreenpcDetailProcess");
const ScreenpcAddlistProcess = require("../process/screenpcProcess/ScreenpcAddlistProcess");
const ScreenpcDeleteProcess = require("../process/screenpcProcess/ScreenpcDeleteProcess");
const ScreenpcUpdateProcess = require("../process/screenpcProcess/ScreenpcUpdateProcess");


exports.getAllDataSC = async (req,res) => {
    try {
        const screenpcSearchProcess = new ScreenpcSearchProcess(dbcon.dbDemo);
        await screenpcSearchProcess.start();
        const session = screenpcSearchProcess.transaction;
        let response = await screenpcSearchProcess.search(req.body,session);
        await screenpcSearchProcess.commit();
        return res.status(200).send(new Response(0, Const.MSGsucessystem , response));
    } catch (error) {
        return res.status(200).send(new Response(1001,Const.MSGerrorsystem, error.message));
    }
}

exports.addListDatasc = async (req,res) => {
    try {
        const screenpcAddlistProcess = new ScreenpcAddlistProcess(dbcon.dbDemo);
        await screenpcAddlistProcess.start();
        const session = screenpcAddlistProcess.transaction;
        let response = await screenpcAddlistProcess.addList(req.body,session);
        await screenpcAddlistProcess.commit();
        return res.status(200).send(new Response(0, Const.MSGsucessystem , response));
    } catch (error) {
        return res.status(200).send(new Response(1001,Const.MSGerrorsystem, error.message));
    }
}

exports.getDetailDataSC = async (req,res) => {
    try {
        const screenpcDetailProcess = new ScreenpcDetailProcess(dbcon.dbDemo);
        await screenpcDetailProcess.start();
        const session = screenpcDetailProcess.transaction;
        let response = await screenpcDetailProcess.getDetail(req.body,session);
        await screenpcDetailProcess.commit();
        return res.status(200).send(new Response(0, Const.MSGsucessystem , response));
    } catch (error) {
        return res.status(200).send(new Response(1001,Const.MSGerrorsystem, error.message));
    }
}

exports.updateDataSC = async (req,res) => {
    try {
        const screenpcUpdateProcess = new ScreenpcUpdateProcess(dbcon.dbDemo);
        await screenpcUpdateProcess.start();
        const session = screenpcUpdateProcess.transaction;
        let response = await screenpcUpdateProcess.update(req.body,session);
        await screenpcUpdateProcess.commit();
        return res.status(200).send(new Response(0, Const.MSGsucessystem , response));
    } catch (error) {
        return res.status(200).send(new Response(1001,Const.MSGerrorsystem, error.message));
    }
}

exports.deletelDataSC = async (req, res) => {
    try {
        const screenpcDeleteProcess = new ScreenpcDeleteProcess(dbcon.dbDemo);
        await screenpcDeleteProcess.start();
        const session = screenpcDeleteProcess.transaction;
        let response = await screenpcDeleteProcess.delete(req.body, session);
        await screenpcDeleteProcess.commit();
        return res.status(200).send(new Response(0, Const.MSGsucessystem , response));
    } catch (error) {
        return res.status(200).send(new Response(1001,Const.MSGerrorsystem, error.message));
    }
}