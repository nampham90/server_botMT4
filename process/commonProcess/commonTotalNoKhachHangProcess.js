const AbsProcess = require("../abstractProcess/Transaction");
const { ObjectId } = require("mongodb")

class CommonTotalNoKhachHangProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async totalNoKhachHang(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        let tongno = 0;
        let PNH = db.models.phieunhaphang;
        let search = {};
        search.iduser = ObjectId(data.iduser);
        search.hinhthucthanhtoan = 2;
        search.trangthai = 3;
        let lst = await PNH.find(search);
        for(let element of lst) {
           tongno = tongno + element['tiencuoc'];
        }
        return tongno;
    }

}

module.exports = CommonTotalNoKhachHangProcess