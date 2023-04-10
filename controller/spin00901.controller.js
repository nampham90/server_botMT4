const dbCon = require('../common/DBConnect');

const Spin00901SearchProcess = require("../process/spin00901Process/spin00901SearchProcess");

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

}

exports.Update = async (req,res) => {

}

exports.Delete = async (req,res) => {

}

exports.AllDelete = async (req,res) => {

}