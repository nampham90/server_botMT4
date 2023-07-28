const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');

class CommonGetListSoidProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

   async searchParam(db,data) {
        const KH = db.models.user;
        let search = {}
        search.idchuyen = null;
        search.trangthai = 1;
        let filters = data.filters;
        if(filters.makho) {
            search.makho = filters.makho;
        }
        if(filters.makhachhang) {
            let u = await KH.findOne({makhachhang: filters.makhachhang});
            if(u) {
                search.iduser = ObjectId(u._id);
            }
        }
        return search;
    }

    async process(db,data,session) {
        const PNH = db.models.phieunhaphang;
        let search = await this.searchParam(db,data);
        let allData = await PNH.find(search)
        .populate("iduser",{password:0})
        .populate({
            path: "cpdvtncd",
            populate: [
              { path: "tangbonhaphang" },
              { path: "tangbotrahang" },
              { path: "dichvuxecau" , populate: [{path: "loaidichvu"}]},
              { path: "dichvubocxep", populate: [{path: "loaidichvu"}] }
            ],
            match: { cpdvtncd: { $ne: null } }
        });
        if(data.pageNum == 0 && data.pageSize ==0) {
           return allData;
        } else {
            let n = data.pageNum - 1;
            let lst = await PNH.find(search).limit(data.pageSize).skip(data.pageSize*n)
            .populate("iduser",{password:0})
            .populate({
                path: "cpdvtncd",
                populate: [
                  { path: "tangbonhaphang" },
                  { path: "tangbotrahang" },
                  { path: "dichvuxecau" , populate: [{path: "loaidichvu"}]},
                  { path: "dichvubocxep", populate: [{path: "loaidichvu"}] }
                ],
                match: { cpdvtncd: { $ne: null } }
            });
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }
}
module.exports = CommonGetListSoidProcess