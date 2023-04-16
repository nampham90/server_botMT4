const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');

//process
const Spin00801SearchProcess = require('../process/spin00801Process/spin00801SearchPorcess');
const Spin00801DeleteProcess = require('../process/spin00801Process/spin00801DeleteProcess');
const Spin00801DeletemanyProcess = require('../process/spin00801Process/spin00801DeletemanyProcess');

exports.search = async (req,res) => {
    try {
        const spin00801SearchProcess = new Spin00801SearchProcess(dbCon.dbDemo);
        await spin00801SearchProcess.start();
        const session = spin00801SearchProcess.transaction;
        let data = await spin00801SearchProcess.search(req.body,session);
        await spin00801SearchProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.delete = async (req, res) => {
    try {
        const spin00801DeleteProcess = new Spin00801DeleteProcess(dbCon.dbDemo);
        await spin00801DeleteProcess.start();
        const session = spin00801DeleteProcess.transaction;
        let data = await spin00801DeleteProcess.delete(req.body,session);
        await spin00801DeleteProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.deletemany = async (req, res) => {
    try {
        const spin00801DeletemanyProcess = new Spin00801DeletemanyProcess(dbCon.dbDemo);
        await spin00801DeletemanyProcess.start();
        const session = spin00801DeletemanyProcess.transaction;
        let data = await spin00801DeletemanyProcess.delete(req.body,session);
        await spin00801DeletemanyProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}