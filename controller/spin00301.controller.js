const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');

// process
const Spin00301SearchProcess = require("../process/spin00301Process/spin00301SearchProcess");


exports.search = async (req,res) => {
    try {
        const spin00301SearchProcess = new Spin00301SearchProcess(dbCon.dbDemo);
        await spin00301SearchProcess.start();
        const session = spin00301SearchProcess.transaction;
        let data = await spin00301SearchProcess.search(req.body,session);
        await spin00301SearchProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}