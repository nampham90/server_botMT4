const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
const _ = require("lodash");

class Spin00251GetPHNProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getPHN(req,session) {
        return this.execute(this.database,req,session);
    }

    async process(db,req,session) {
       let listsp = await this.getListsp(db,req,session);
       let header = await this.getHeader(db,req,session);
       let res = {
          "header": header,
          "listsp": listsp
       }
       return res;
    }

    async getHeader(db,req,session) {
        const TIN100 = db.models.tin100;
        let tin100res = await TIN100.collection.findOne({soID:req.soID});
        return tin100res;
    }

    async getListsp(db,req,session) {
        const PNH = db.models.phieunhaphang;
        let lstPNH = await PNH.find({soID:req.soID});
        return lstPNH;
    }

}

module.exports = Spin00251GetPHNProcess