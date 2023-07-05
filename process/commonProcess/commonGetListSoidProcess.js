const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");

class CommonGetListSoidProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const PNH = db.models.phieunhaphang;
        let allData = await PNH.find(data.filters)
        .populate("iduser",{password:0});
        if(data.pageNum == 0 && data.pageSize ==0) {
           return allData;
        } else {
            let n = data.pageNum - 1;
            let lst = await PNH.find(data.filters).limit(data.pageSize).skip(data.pageSize*n)
            .populate("iduser",{password:0});
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }
}
module.exports = CommonGetListSoidProcess