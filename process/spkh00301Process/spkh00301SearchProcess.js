const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');

class Spkh00301SearchProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    paramsSearch(data){
        let conditions = [];
        let filters = data.filters;
        let gt = "01/01/1970";
        let lt = "01/01/2100";
        let search = {};
        if(filters.ngaybatdau) {
            gt = filters.ngaybatdau;
        }
        if(filters.ngayketthuc) {
            lt = filters.ngayketthuc;
        }
        search.ngaynhap = {$gte:gt,$lt:lt};

        if(filters.soHDTTCN) {
            conditions.push({ soHDTTCN: { $regex: new RegExp(filters.soHDTTCN + "$") } });
        }
        // Thêm điều kiện soHDTTCN khác null
        conditions.push({ soHDTTCN: { $ne: null } });
        conditions.push({ ngayphathanh: { $ne: null }});
        // Kết hợp các điều kiện lại với nhau bằng toán tử $and
        if (conditions.length > 0) {
            search.$and = conditions;
        }

        return search;
    }

    async process(db,data,session) {
        let search = this.paramsSearch(data);
        const PNH = db.models.phieunhaphang;
        let allData = await PNH.find(search)
        .populate("iduser",{password:0});
        if(data.pageNum == 0 && data.pageSize ==0) {
            return allData;
         } else {
             let n = 0;
             if(data.pageNum > 0) {
                 n = data.pageNum - 1
             }
             let lst = await PNH.find(search).limit(data.pageSize).skip(data.pageSize*n)
             .populate("iduser",{password:0});
             let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
             return res;
         }
    }
}

module.exports = Spkh00301SearchProcess;