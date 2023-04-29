const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
//process 
const Spkh00301SearchProcess = require("../process/spkh00301Process/spkh00301SearchProcess");
exports.search = async (req, res) => {
    try {
        const spkh00301SearchProcess = new Spkh00301SearchProcess(dbCon.dbDemo);
        await spkh00301SearchProcess.start();
        const session = spkh00301SearchProcess.transaction;
        let response = await spkh00301SearchProcess.search(req.body,session);
        await spkh00301SearchProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}