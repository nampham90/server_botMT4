const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
// process
const Spch00201UpdateTiencuocxenhaProcess = require("../process/spch00201Process/spch00201UpdateTiencuocxenhaProcess");
const Spch00201UpdateTiencuocxengoaiProcess = require("../process/spch00201Process/spch00201UpdateTiencuocxengoaiProcess");
exports.updateTiencuocSoID = async (req,res) => {
    try {
        let request = {
            "iduser": req.userID,
            "loaithongbao": "notifi",
            "hanhdong": "new",
            "table": "phieunhaphang và nhatkykh",
            "soID": req.body.soID,
            "idNhatkykh" : req.body.idNhatkykh,
            "tiencuocupdate": req.body.tiencuocupdate,
            "lydo": req.body.lydo
        }
        const spch00201UpdateTiencuocxenhaProcess = new Spch00201UpdateTiencuocxenhaProcess(dbCon.dbDemo);
        await spch00201UpdateTiencuocxenhaProcess.start();
        const session = spch00201UpdateTiencuocxenhaProcess.transaction;
        let response = await spch00201UpdateTiencuocxenhaProcess.updateTiencuocxenha(request,session);
        await spch00201UpdateTiencuocxenhaProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
        
    }
}

exports.updateTiencuocxengoai = async (req,res) => {
    try {
        let request = {
            "iduser": req.userID,
            "loaithongbao": "notifi",
            "hanhdong": "new",
            "table": "chitietchuyenngoai và nhatkykh",
            "idchuyenngoai": req.body.idchuyenngoai,
            "sdtnguoinhan": req.body.sdtnguoinhan,
            "tenhang": req.body.tenhang,
            "tiencuoc": req.body.tiencuoc,
            "idNhatkykh" : req.body.idNhatkykh,
            "tiencuocupdate": req.body.tiencuocupdate,
            "lydo": req.body.lydo
        }
        const spch00201UpdateTiencuocxengoaiProcess = new Spch00201UpdateTiencuocxengoaiProcess(dbCon.dbDemo);
        await spch00201UpdateTiencuocxengoaiProcess.start();
        const session = spch00201UpdateTiencuocxengoaiProcess.transaction;
        let response = await spch00201UpdateTiencuocxengoaiProcess.updateTiencuocxengoai(request,session);
        await spch00201UpdateTiencuocxengoaiProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}