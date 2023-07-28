const AbsProcess = require("../../process/abstractProcess/Transaction");
const GhinhatkyhethongProcess = require("../../process/commonProcess/commonGhinhatkyhethongProcess");
class Spkh00201HuyThanhtoanProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async huythanhtoan(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        let check = await this.checkSoHDTTCNKH(db,data);
        if(check) {
            const PNH = db.models.phieunhaphang;
            // thực hiện huy thanh toán;
            await PNH.collection.updateMany({soHDTTCN: { $regex: new RegExp(data.sohdttcnkh + "$") }},{$set: {status01: 0, hinhthucthanhtoan: 2, ngaythanhtoan: null}},{session});
            const ghinhatkyhethongProcess = new GhinhatkyhethongProcess(db);
            let datank = {
                "loaithongbao": 'system',
                "lydo": 'Hủy thanh toán công nợ đơn số: ' +  data.sohdttcnkh,
                "iduser": data.userid,
                "hanhdong": "updateMany",
                "table": "phieunhaphang"
            }
            await ghinhatkyhethongProcess.ghinhatkyhethong(datank,session)
            return 1;
        }
        return 0;
    }

    async checkSoHDTTCNKH(db, data) {
        const PNH = db.models.phieunhaphang;
        let search = {}
        search.soHDTTCN = { $regex: new RegExp(data.sohdttcnkh + "$") };
        search.status01 = 1;
        search.trangthai = 3;
        let lst = await PNH.find(search);
        if(lst.length > 0) {
            return true;
        }
        return false;
    }
}

module.exports = Spkh00201HuyThanhtoanProcess