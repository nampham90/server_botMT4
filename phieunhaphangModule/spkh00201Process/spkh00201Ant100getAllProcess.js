const AbsProcess = require("../../process/abstractProcess/Transaction");
let commonfun = require('../../common/functionCommon');
const { ObjectId } = require('mongodb');
class Spkh00201Ant100getAllProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    searchParams(data){
        let filters = data.filters;
        let search = {};
        let gt = "01/01/1970";
        let lt = "01/01/2100";
        if(filters.ngaybatdau) {
            gt = filters.ngaybatdau;
        }
        if(filters.ngayketthuc) {
            lt = filters.ngayketthuc;
        }
        search.ngaynhapthucte = {$gte:new Date(gt),$lte: new Date(commonfun.fnEndSearch(lt))};

        if(filters.iduser) {
            search.iduser = ObjectId(filters.iduser);
        }
        search.hinhthucthanhtoan = 2;
        search.trangthai = 1;
        return search;
    }

    async process(db, req, session) {
       const PNH = db.models.phieunhaphang;
       let search = this.searchParams(req);
       let allData = await PNH.find(search).sort( { "ngaynhapthucte": -1 } );
       if(req.pageNum == 0 && req.pageSize == 0) {
         return allData
       } else {
            let n = 0;
            if(req.pageNum > 0) {
                n = req.pageNum - 1
            }
            let lst = await PNH.find(search).sort( { "ngaynhapthucte": -1 } )
            .limit(req.pageSize).skip(req.pageSize*n);
            let data = commonfun.dataReponse(allData,lst,req.pageNum,req.pageSize);
            return data;
       }
    }
}

module.exports = Spkh00201Ant100getAllProcess