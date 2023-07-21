
const dbCon = require('../../common/DBConnect');
let Responses = require('../../common/response');
let Response = Responses.Response
let commonfun = require('../../common/functionCommon');

const Spkh00101GetListsProcess = require('../process/spkh00101GetListsProcess');

exports.getLists = async (req, res, next) => {
    try {
        const spkh00101GetListsProcess = new Spkh00101GetListsProcess(dbCon.dbDemo);
        await spkh00101GetListsProcess.start();
        const session = spkh00101GetListsProcess.transaction;
        let response = await spkh00101GetListsProcess.getLists(req.body,session);
        await spkh00101GetListsProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}