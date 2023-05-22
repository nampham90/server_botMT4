//
const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response

const Spch00251HuychuyenngoaiProcess = require("../process/chuyenProcess/spch00251HuychuyenngoaiProcess");

exports.huychuyenngoai = async (req,res) => {
    try {
        const spch00251HuychuyenngoaiProcess = new Spch00251HuychuyenngoaiProcess(dbCon.dbDemo);
        await spch00251HuychuyenngoaiProcess.start();
        const session = spch00251HuychuyenngoaiProcess.transaction;
        let response = await spch00251HuychuyenngoaiProcess.huychuyenngoai(req.body,session);
        await spch00251HuychuyenngoaiProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));  
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}
