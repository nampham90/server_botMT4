const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
//process
const Tmt030GetSystemFlgProcess = require("../process/tmt030Process/tmt030GetSystemFlgProcess");

exports.getSYSFLG = async (req,res) => {
    try {
       const tmt030GetSystemFlgProcess = new Tmt030GetSystemFlgProcess(dbCon.dbDemo);
       await tmt030GetSystemFlgProcess.start();
       const session = tmt030GetSystemFlgProcess.transaction;
       let response = await tmt030GetSystemFlgProcess.getSYSFLG(req.body,session);
       await tmt030GetSystemFlgProcess.commit();
       return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
       return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}