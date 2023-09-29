const AbstractProcess = require('../../../process/abstractProcess/AbstractMysqlPorcess');
let ErrorDto = require('../../../common/ErrorDto');
const Spin00101GetUserMysqlResponse = require("../dto/spin00101GetUserMysqlDto/spin00101GetUserMysqlResponse");
class Spin00101GetUserMysqlProcess extends AbstractProcess {

    constructor(dbcon) {
        super(dbcon);
    }

    async getuserMysql(req) {
      return this.execute(this.database,req);
    }

    async process(db, req) {
        let lstErr = [];
        let response = {
            lstErr: lstErr,
            data: null,
        }
        const code = '1';
        const sql = "SELECT * from product WHERE IDPRO = ?";

        try {
            const  [rows, fields]  = await db.execute(sql, [code]);
            if (rows.length > 0) {
                const {IDPRO,PRONAME,PIRCE} = rows[0]
                response.data = new Spin00101GetUserMysqlResponse(IDPRO,PRONAME,PIRCE);
            } else {
               const e = new ErrorDto("MI00001","Không có dử liệu");
               response.lstErr.push(e);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Spin00101GetUserMysqlProcess;
