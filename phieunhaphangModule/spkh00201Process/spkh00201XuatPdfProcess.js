const AbsProcess = require("../../process/abstractProcess/Transaction");

const GhinhatkyhethongProcess = require("../../process/commonProcess/commonGhinhatkyhethongProcess");
class Spkh00201XuatPdfProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async xuatPdf(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const PNH = db.models.phieunhaphang;
        let rs = await PNH.collection.updateMany({soID: {$in: data.lstsoID}}, {$set: {soHDTTCN:data.SoHDTTCNKH, status01: 0, ngayphathanh: new Date() }}, {session});
        const ghinhatkyhethongProcess = new GhinhatkyhethongProcess(db);
        let datank = {
            "loaithongbao": 'system',
            "lydo": 'Phát hành công nợ. ' +  data.SoHDTTCNKH,
            "iduser": data.userid,
            "hanhdong": "updateMany",
            "table": "phieunhaphang"
        }
        await ghinhatkyhethongProcess.ghinhatkyhethong(datank,session)
        return rs;
    }
}

module.exports = Spkh00201XuatPdfProcess;