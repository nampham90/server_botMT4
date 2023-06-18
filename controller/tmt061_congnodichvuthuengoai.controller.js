const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response

// process
const Tmt061SearchProcess = require("../process/tmt061Process/tmt061SearchProcess");
const Tmt061CheckoutProcess  = require("../process/tmt061Process/tmt061CheckoutProcess");
exports.getAll = async (req,res) => {
    try {
        const tmt061SearchProcess = new Tmt061SearchProcess(dbCon.dbDemo);
        await  tmt061SearchProcess.start()
        const session = tmt061SearchProcess.transaction;
        let response = await tmt061SearchProcess.search(req.body,session);
        await tmt061SearchProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.checkout = async (req, res) => {
    try {
        const tmt061CheckoutProcess = new Tmt061CheckoutProcess(dbCon.dbDemo);
        await tmt061CheckoutProcess.start();
        const session = tmt061CheckoutProcess.transaction;
        let response = await tmt061CheckoutProcess.checkout(req.body,session);
        await tmt061CheckoutProcess.commit();
        return res.status(200).send(new Response(0,'data sucess !',response));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
}

exports.update = async (req, res) => {}