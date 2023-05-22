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
        sreach.ngayxuat = {$gte:gt,$lt:lt};
        if(filters.soODC) {
            sreach.soodc = { $regex: new RegExp(filters.soODC + "$") };
        }
        if(filters.iduser) {
            sreach.idkhachhang = ObjectId(filters.iduser);
        }
        if(filters.status01 == 0) {
            sreach.status01 = filters.status01;
        }
        if(filters.status01) {
            sreach.status01 = filters.status01;
        }
        return sreach;
    }

    async process(db,data,session) {
        let search = this.paramsSearch(data);
        const DonODC = db.models.donodc;
        let allData = await DonODC.find(search)
        .populate("idkhachhang",{password:0});
        if(data.pageNum == 0 && data.pageSize ==0) {
            return allData;
         } else {
             let n = 0;
             if(data.pageNum > 0) {
                 n = data.pageNum - 1
             }
             let lst = await DonODC.find(search).limit(data.pageSize).skip(data.pageSize*n)
             .populate("idkhachhang");
             let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
             return res;
         }
    }
}

module.exports = Spkh00301SearchProcess;