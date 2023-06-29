const dbcon = require("../common/DBConnect");
const Const = require('../common/const');
let Responses = require('../common/response');
let Response = Responses.Response;
// process
const Tmt010SaveFileProcess = require('../process/tmt010FileProcess/Tmt010SaveFileProcess')

exports.saveFile = async (req, res) => {
    console.log(req.fileInformation);
    let data = {
        userID: req.userID,
        fileInformation: req.fileInformation
    }
    try {
        const tmt010SaveFileProcess = new Tmt010SaveFileProcess(dbcon.dbDemo);
        await tmt010SaveFileProcess.start();
        const session = tmt010SaveFileProcess.transaction;
        let response = await tmt010SaveFileProcess.saveFile(data,session);
        await tmt010SaveFileProcess.commit();
        return res.status(200).send(new Response(0,"sava file sucess!", response));
    } catch (error) {
        return res.status(200).send(new Response(0,Const.MSGerrorsystem, error.message));
    }

}
