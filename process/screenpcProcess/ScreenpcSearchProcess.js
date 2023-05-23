const AbstractProcess = require("../abstractProcess/Transaction");
let commonfun = require('../../common/functionCommon');
class ScreenpcSearchProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    paramsSearch(data){
        let filters = data.filters;
        let search = {};
        if(filters.idmenu) {
            search.idmenu = filters.idmenu
        }
        if(filters.urldisplayid && sreach.urldisplayid != "") {
            search.urldisplayid =  { $regex: new RegExp(filters.urldisplayid + "$") };
        }
        return search;
    }

    async process(db,data,session) {
        let search = this.paramsSearch(data);
        const Screenpc = db.models.screenpc;
        let allData = await Screenpc.find(search); 
        if(data.pageNum == 0 && data.pageSize == 0) {
            return allData
        } else {
            let n = 0;
            if(data.pageNum > 0) {
                n = data.pageNum - 1
            }
            let lst = await Screenpc.find(search).limit(data.pageSize).skip(data.pageSize*n);
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }

}

module.exports = ScreenpcSearchProcess;