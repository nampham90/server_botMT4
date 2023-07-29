const AbsProcess = require("../../../process/abstractProcess/Transaction");
const Const = require("../../../common/const");
const commonfun = require("../../../common/functionCommon");
const _ = require("lodash");
const {ObjectId} = require('mongodb');
const GhinhatkyhethongProcess = require("../../../process/commonProcess/commonGhinhatkyhethongProcess");
class Spch00201HoanthanhchuyenhangProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async hoanthanhchuyenhang(data,session) {
        return this.execute(this.database,data,session);
    }


    async process(db, data, session) {
        const Chuyen = db.models.chuyen;
        let c = await Chuyen.findOne({_id: data.id});
        let rs = await Chuyen.collection.updateOne({_id: ObjectId(data.id)},{$set: {trangthai: 2}},{session});
        const ghinhatkyhethongProcess = new GhinhatkyhethongProcess(db);
        let datank = {
            "loaithongbao": 'system',
            "lydo": 'Hoàn thành chuyến hàng Số. ' +  c['soodt'],
            "iduser": data.userid,
            "hanhdong": "updateMany",
            "table": "phieunhaphang"
        }
        await ghinhatkyhethongProcess.ghinhatkyhethong(datank,session)
        return rs;
    }
}

module.exports = Spch00201HoanthanhchuyenhangProcess