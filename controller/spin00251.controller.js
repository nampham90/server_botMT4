const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
// process
const Spin00251RegisterProcess = require('../process/spin00251Process/spin00251RegisterProcess');
const Spin00251GetPHNProcess = require("../process/spin00251Process/spin00251GetPNHProcess");
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

            const spin00251GetPHNProcess = new Spin00251GetPHNProcess(dbCon.dbDemo);
            await  spin00251GetPHNProcess.start();
            const session2 = spin00251GetPHNProcess.transaction
            let resPNH = await spin00251GetPHNProcess.getPHN({soID:req.body.soID},session2);
            let resdata = mergeResRegister(resPNH);
            await spin00251GetPHNProcess.commit();
            return  res.status(200).send(new Response(0,"Data sucess ", resdata));
        } else {
            await spin00251RegisterProcess.rollback();
            return  res.status(200).send(new Response(0,"Data sucess ", null));
        }
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

function mergeResRegister(reqPNH) {
    let header = {
        "soID": reqPNH['header']['soID'],
        "iduser": reqPNH['header']['iduser'],
        "hinhthucthanhtoan": reqPNH['header']['hinhthucthanhtoan']+"",
        "ghichu": reqPNH['header']['ghichu']
    }
    let res = {
        "header": header,
        "listsp": reqPNH['listsp']
    }
    return res;
}

exports.getPhieunhap = async (req,res) => {
    try {
        const spin00251GetPHNProcess = new Spin00251GetPHNProcess(dbCon.dbDemo);
        await spin00251GetPHNProcess.start();
        const session = spin00251GetPHNProcess.transaction;
        let data = await spin00251GetPHNProcess.getPHN(req.body,session);
        await spin00251GetPHNProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));  
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }

}

exports.Update = async (req,res) =>{

}