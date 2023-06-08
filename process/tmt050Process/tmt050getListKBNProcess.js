const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");

class Tmt050getListKBNProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getListKBN(data,session) {
        return this.execute(this.database,data,session);
    }

    paramsSearch(data) {
        let filters = data.filters;
        let search = {};
        if(filters.rcdkbn) {
            search.rcdkbn = filters.rcdkbn;
        }
        return search;
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        let search = this.paramsSearch(data);
        let allData = await TMT050.find(search);
        if(data.pageNum == 0 && data.pageSize ==0) {
            return allData;
        } else {
            let n = 0;
            if(data.pageNum > 0) {
                n = data.pageNum - 1
            }
            let lst = await TMT050.find(search).limit(data.pageSize).skip(data.pageSize*n);
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }
}

module.exports = Tmt050getListKBNProcess