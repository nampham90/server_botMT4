const AbstractProcess = require("../../../process/abstractProcess/AbstractProcess");
let commonfun = require('../../../common/functionCommon');
class ListDemoProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async getlist(data,session) {
        return this.execute(this.database,data,session);
    }

    searchParam(data) {
        let filters = data.filters;
        let search = {};
        return search;
    }

    async process(db, data, session) {
        let search = this.searchParam(data);
        const Demo = db.models.demo;
        let allData = await Demo.find(search);
        if(data.pageNum == 0 && data.pageSize == 0) {
            return allData
        } else {
            let n = 0;
            if(data.pageNum > 0) {
                n = data.pageNum - 1
            }
            let lst = await Demo.find(search).limit(data.pageSize).skip(data.pageSize*n);
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
       
    }
}

module.exports = ListDemoProcess;