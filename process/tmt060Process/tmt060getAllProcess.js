const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');
class Tmt060getAllProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getAll(data,session) {
        return this.execute(this.database,data,session);
    }

    paramsSearch(data) {
        let filters = data.filters;
        let search = {};
        if(filters.loaidichvu) {
            search.loaidichvu = ObjectId(filters.loaidichvu);
        }

        return search;
    }

    async process(db,data,session) {
        const TMT060 = db.models.tmt060_dichvuthuengoai;
        let search = this.paramsSearch(data);
        let allData = await TMT060.find(search);
        if(data.pageNum == 0 && data.pageSize ==0) {
            return allData;
        } else {
            let n = 0;
            if(data.pageNum > 0) {
                n = data.pageNum - 1
            }
            let lst = await TMT060.find(search).limit(data.pageSize).skip(data.pageSize*n);
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }
}

module.exports = Tmt060getAllProcess;