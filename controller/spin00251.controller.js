const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
// process
const Spin00251RegisterProcess = require('../process/spin00251Process/spin00251RegisterProcess');

exports.Register = async (req,res) => {
    try {
        let soID = await commonfun.fnGetID();
        req.body.soID = soID;
        const spin00251RegisterProcess = new Spin00251RegisterProcess(dbCon.dbDemo);
        await spin00251RegisterProcess.start();
        const session = spin00251RegisterProcess.transaction;
        let data = await spin00251RegisterProcess.register(req.body,session);
        if(data == 0) {
            await spin00251RegisterProcess.commit();
            return  res.status(200).send(new Response(0,"Data sucess ", req.body.soID));
        } else {
            await spin00251RegisterProcess.rollback();
            return  res.status(200).send(new Response(0,"Data sucess ", null));
        }
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }

}

exports.Update = async (req,res) =>{

}