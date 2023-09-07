const dbConfig = require("../../../config/config");
let Responses = require('../../../common/response');
let ErrorDto = require('../../../common/ErrorDto');
let Response = Responses.Response;


const Spin00101GetUserMysqlProcess = require("../process/spin00101GetUserMysqlProcess");

exports.getUserMysql = async (req,res) => {
    let lstErr = [];
    try {
        const spin00101GetUserMysqlProcess = new Spin00101GetUserMysqlProcess(dbConfig.dbMysqlConfig);
        let {lstErr,data} = await spin00101GetUserMysqlProcess.getuserMysql(req.body);
        _io.emit('chat message', "server send router :" + "aaaa");
        return res.status(200).send(new Response(0,lstErr, data));
    } catch (error) {
        const err = new ErrorDto("ME00002", error.message );
        lstErr.push(err)
        return res.status(200).send(new Response(0,lstErr, null));
    }
}