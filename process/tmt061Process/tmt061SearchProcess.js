const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');

class Tmt061SearchProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    paramsSearch(data) {
        let filters = data.filters;
        let search = {};
        if(filters.manhacungcap) {
            search.manhacungcap = filters.manhacungcap
        }
        if(filters.status01) {
            search.status01 = filters.status01;
        }
        return search;
    }

    async process(db,data,session) {
        const TMT061 = db.models.tmt061_congnodichvuthuengoai
        let search = this.paramsSearch(data);
        let allData = await TMT061.find(search)
        .populate("manhacungcap");
        if(data.pageNum == 0 && data.pageSize ==0) {
            return allData;
        } else {
            let n = 0;
            if(data.pageNum > 0) {
                n = data.pageNum - 1
            }
            let lst = await TMT061.find(search).limit(data.pageSize).skip(data.pageSize*n)
            .populate("manhacungcap");
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }

}

module.exports = Tmt061SearchProcess;

