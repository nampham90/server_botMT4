const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');
class Spin00301SearchProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    paramsSearch(data){
        let filters = data.filters;
        let gt = "01/01/1970";
        let lt = "01/01/2100";
        let sreach = {};
        if(filters.ngaybatdau) {
            gt = filters.ngaybatdau;
        }
        if(filters.ngayketthuc) {
            lt = filters.ngayketthuc;
        }
        sreach.ngaynhap = {$gte:gt,$lt:lt};
        if(filters.soID) {
            sreach.soID = filters.soID;
        }
        if(filters.iduser) {
            sreach.iduser = filters.iduser;
        }
        if(filters.makho) {
            sreach.makho = filters.makho;
        }
        if(filters.trangthai && filters.trangthai.length > 0) {
            sreach.$or = filters.trangthai;
        }
        return sreach;
    }

    async process(db,data,session) {
        let search = this.paramsSearch(data);
        console.log(search);
        const PNH = db.models.phieunhaphang;
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
        })
        .populate("nguoiphathanh",{password:0});
        if(data.pageNum == 0 && data.pageSize ==0) {
           return allData;
        } else {
            let n = 0;
            if(data.pageNum > 0) {
                n = data.pageNum - 1
            }
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
            })
            .populate("nguoiphathanh",{password:0});
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }
}

module.exports = Spin00301SearchProcess