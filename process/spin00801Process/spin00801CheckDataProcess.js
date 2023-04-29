const AbsProcess = require("../abstractProcess/Transaction");

class Spin00801CheckData extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    // check dư xóa có hợp lệ hay không
    async checkDataSpin00801(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let check = false;
        // kiem tra dự liệu có phải một mang hay không
        if(Array.isArray(data)) {
            // check dư liêu trong mang
            for(let element of data) {
                if(this.checkDetail(db,element,session)==1) {
                    check = true;
                }
                break;
            }
        } else {
           // check dự liệu string
           let checkDetail = await this.checkDetail(db,data,session);
           if(checkDetail == 1) {
               check = true;
           }
        }
        return check;
    }

    async checkDetail(db,soID,session) {
        const PNH = db.models.phieunhaphang;
        let p = await PNH.collection.findOne({soID: soID},{session});
        if(p.status02 == 1) {
            return 1;
        } 
        return 0;
    }
}
module.exports = Spin00801CheckData