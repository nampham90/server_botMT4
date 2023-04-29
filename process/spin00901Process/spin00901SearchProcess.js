const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");

class Spin00901SearchProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        let allData = await TMT050.find(data.filters);
        if(data.pageNum == 0 && data.pageSize ==0) {
           return allData;
        } else {
            let n = data.pageNum - 1;
            let lst = await TMT050.find(data.filters).limit(data.pageSize).skip(data.pageSize*n);
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }
}

module.exports = Spin00901SearchProcess;