const AbsProcess = require("../abstractProcess/Transaction");

class Spin00901SearchProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        let allData = await TMT050.collection.find(data.filters);
        if(data.pageNum == 0 && data.pageSize ==0) {
           return allData;
        } else {
            let n = data.pageNum - 1;
            let lst = await TMT050.collection.find(data.filters).limit(data.pageSize).skip(data.pageSize*n);
            let data = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return data;
        }
    }
}

module.exports = Spin00901SearchProcess;