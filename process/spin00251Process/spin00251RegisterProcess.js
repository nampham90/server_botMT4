const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
const _ = require("lodash");
class Spin00251RegisterProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async register(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        await this.insertTIN100(db,data,session);
    }

    async insertTIN100(db,data,session) {
        const TIN100 = db.models.tin100;
        let newTin100 = new TIN100({
            soID: data.soID,//
            iduser: data.iduser,
            ngaynhap: _.now(),
            hinhthucthanhtoan: data.hinhthucthanhtoan,
            ghichu: data.ghichu,
            status01: 0, 
            status02: 0, 
            status03: 0, 
            status04: 0,
            status05: 0
        });
        await TIN100.collection.insertOne(newTin100, { session });
    }

    async insertPhienNhapHang(db,data,session) {
        const PNH = db.models.phieunhaphang;

    }
}

module.exports = Spin00251RegisterProcess