const dbConfig = require("../../../config/config");
const dbcon = require("../../../common/DBConnect");
let Responses = require('../../../common/response');
let ErrorDto = require('../../../common/ErrorDto');
let Response = Responses.Response;


const Spin00101GetUserMysqlProcess = require("../process/spin00101GetUserMysqlProcess");
const ExportDataMongo = require("../process/spin00101ExportDataMongoProcess");
const ImportDataMysql = require("../process/spin00101ImportDataMysqlProcess");

exports.getUserMysql = async (req,res) => {
    let lstErr = [];
    try {
        //const spin00101GetUserMysqlProcess = new Spin00101GetUserMysqlProcess(dbConfig.dbMysqlConfig);
        // let {lstErr,data} = await spin00101GetUserMysqlProcess.getuserMysql(req.body);
        // _io.emit('chat message', "server send router :" + "aaaa");
        const exportDataMongo = new ExportDataMongo(dbcon.dbDemo);
        await exportDataMongo.start();
        const session = exportDataMongo.transaction;
        let datares = await exportDataMongo.export("", session);
        await exportDataMongo.commit();

        const importDataMysql = new ImportDataMysql(dbConfig.dbMysqlConfigNHA);
        await importDataMysql.import(datares);

        return res.status(200).send(new Response(0,"sucess", datares));
    } catch (error) {
        const err = new ErrorDto("ME00002", error.message );
        lstErr.push(err)
        return res.status(200).send(new Response(0,lstErr, null));
    }
}