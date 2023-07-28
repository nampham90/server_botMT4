const dbCon = require('../../common/DBConnect');
let Responses = require('../../common/response');
let Response = Responses.Response
let commonfun = require('../../common/functionCommon');
// process
const Spch00201UpdateTiencuocSoIDProcess = require("../process/spch00201Process/spch00201UpdateTiencuocSoIDProcess");
exports.updateTiencuocSoID = async (req,res) => {
    try {
        let request = {
            "iduser": req.userID,
            "loaithongbao": "notifi",
            "hanhdong": "new",
            "table": "phieunhaphang",
            "soID": req.body.soID,
            "tiencuocupdate": req.body.tiencuocupdate,
            "lydo": req.body.lydo
        }
        const spch00201UpdateTiencuocSoIDProcess = new Spch00201UpdateTiencuocSoIDProcess(dbCon.dbDemo);
        await spch00201UpdateTiencuocSoIDProcess.start();
        const session = spch00201UpdateTiencuocSoIDProcess.transaction;
        let response = await spch00201UpdateTiencuocSoIDProcess.updateTiencuocSoID(request,session);
        await spch00201UpdateTiencuocSoIDProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
        
    }
}
