const AbstractProcess = require('../../../process/abstractProcess/AbstractProcess');
let commonfun = require('../../../common/functionCommon');
const PageInfo = require("../../../common/pageInfo/pageInfo");
class DemoGetListProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async listProduct(req, session) {
        return this.execute(this.database, req, session);
    }

    searchParam(data) {
        let filters = data.filters;
        let search = {};
        return search;
    }

    async process(db,req, session) {
        let search = this.searchParam(req);
        const Demo = db.models.demo;

        let allData = await Demo.find(search);

        if(req.pageNum == 0 && req.pageSize ==0) {
            return allData;
        } else {
            let n = 0;
            if(req.pageNum > 0) {
                n = req.pageNum - 1;
            }

            const lst = await Demo.find(search).limit(req.pageSize).skip(req.pageSize*n);
            const pageInfo = new PageInfo(allData.length,lst, req.pageNum,req.pageSize);
            return pageInfo;
        }
    }
}

module.exports = DemoGetListProcess;