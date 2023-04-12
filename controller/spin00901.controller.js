const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response

const Spin00901SearchProcess = require("../process/spin00901Process/spin00901SearchProcess");
const Spin00901RegisterProcess = require("../process/spin00901Process/spin00901RegisterProcess");
const Spin00901UpdateProcess = require("../process/spin00901Process/spin00901UpdateProcess");
exports.Sreach = async (req,res) => {
    try {
        const spin00901SearchProcess  = new Spin00901SearchProcess(dbCon.dbDemo);
        await spin00901SearchProcess.start();
        const session = spin00901SearchProcess.transaction;
        let data = await spin00901SearchProcess.search(req.body,session);
        await spin00901SearchProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(0,"Lỗi hệ thống ", error.message));
    }
}

exports.Register = async (req,res) => {
    try {
        const spin00901RegisterProcess = new Spin00901RegisterProcess(dbCon.dbDemo);
        await spin00901RegisterProcess.start();
        const session = spin00901RegisterProcess.transaction;
        let data = await spin00901RegisterProcess.register(req.body,session);
        await spin00901RegisterProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(0,"Lỗi hệ thống ", error.message));
    }
}

exports.Update = async (req,res) => {
    try {
        const spin00901UpdateProcess = new Spin00901UpdateProcess(dbCon.dbDemo);
        await spin00901UpdateProcess.start();
        const session = spin00901UpdateProcess.transaction;
        let data = await spin00901UpdateProcess.update(req.body,session);
        await spin00901UpdateProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(0,"Lỗi hệ thống ", error.message));
    }
}

exports.Delete = async (req,res) => {

}

exports.AllDelete = async (req,res) => {

}