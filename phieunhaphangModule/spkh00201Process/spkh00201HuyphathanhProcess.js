const AbsProcess = require("../../process/abstractProcess/Transaction");
const GhinhatkyhethongProcess = require("../../process/commonProcess/commonGhinhatkyhethongProcess");
class Spkh00201HuyphathanhProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async huyphathanh(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        let check = await this.checkSoHDTTCNKH(db,data);
        if(check) {
            const PNH = db.models.phieunhaphang;
            // thực hiện huy phát hành;
            await PNH.collection.updateMany({soHDTTCN: { $regex: new RegExp(data.sohdttcnkh + "$") }},{$set: {status01: null,soHDTTCN:null,ngayphathanh: null}},{session});
            const ghinhatkyhethongProcess = new GhinhatkyhethongProcess(db);
            let datank = {
                "loaithongbao": 'system',
                "lydo": 'Hủy phát hành công nợ đơn số: ' +  data.sohdttcnkh,
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
        search.status01 = 0;
        search.trangthai = 3;
        let lst = await PNH.find(search);
        if(lst.length > 0) {
            return true;
        }
        return false;
    }
}

module.exports = Spkh00201HuyphathanhProcess