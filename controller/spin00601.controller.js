const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');

// process
const Spin00601XuatHangProcess = require("../process/spin00601Process/spin00601XuatHangProcess");
const Spin00601XuatnhieudonProcess = require("../process/spin00601Process/spin00601XuatnhieudonProcess");
exports.xuathang = async (req,res) => {
    try {
        const spin00601XuatHangProcess = new Spin00601XuatHangProcess(dbCon.dbDemo);
        await spin00601XuatHangProcess.start();
        const session = spin00601XuatHangProcess.transaction;
        let data = await spin00601XuatHangProcess.xuathang(req.body,session);
        await spin00601XuatHangProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống !", null));
    }
}

exports.xuatnhieudon = async (req,res) => {
    try {
        const spin00601XuatnhieudonProcess = new Spin00601XuatnhieudonProcess(dbCon.dbDemo);
        await spin00601XuatnhieudonProcess.start();
        const session = spin00601XuatnhieudonProcess.transaction;
        let data = await spin00601XuatnhieudonProcess.xuatnhieudon(req.body,session);
        await spin00601XuatnhieudonProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống !", null));
    }
}