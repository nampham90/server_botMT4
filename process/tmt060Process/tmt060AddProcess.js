const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');
class Tmt060AddProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async add(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT060 = db.models.tmt060_dichvuthuengoai;
        let newTMT060 = new TMT060({
            tennhacungcap: data.tennhacungcap, // ten người cung cấp.vd: Anh Long
            loaidichvu: ObjectId(data.loaidichvu), // mã loại dịch vụ. luu trong bang tmt050
            diachi: data.diachi, // dia chi
            sodienthoai: data.sodienthoai,//
            status01: "", 
            status02: "", 
            status03: "", 
            status04: "",
            status05: ""
        });
        let res = await TMT060.collection.insertOne(newTMT060, { session });
        return res;
    }
}

module.exports = Tmt060AddProcess;