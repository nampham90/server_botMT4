const dbCon = require('../../common/DBConnect');
let Responses = require('../../common/response');
let Response = Responses.Response
let commonfun = require('../../common/functionCommon');

const Spkh00201Ant100getAllProcess = require("../spkh00201Process/spkh00201Ant100getAllProcess");
exports.searchListCongNo = async (req, res, next) => {
    try {
        const spkh00201Ant100getAllProcess = new Spkh00201Ant100getAllProcess(dbCon.dbDemo);
        await spkh00201Ant100getAllProcess.start();
        const session = spkh00201Ant100getAllProcess.transaction;
        let response = await spkh00201Ant100getAllProcess.search(req.body,session);
        await spkh00201Ant100getAllProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}