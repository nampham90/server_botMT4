const AbsProcess = require("../../../process/abstractProcess/Transaction");

const { ObjectId } = require('mongodb');
class RegisterCongNoXeNgoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async register(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const Congnoxengoai = db.models.congnoxengoai;
        let cnxengoai = new Congnoxengoai({
            nguonxe: ObjectId(data.nguonxe),
            iddonhang: null,
            soID: data.soID,
            ngaynhap : _.now(),
            biensoxe: data.biensoxe,
            tentaixe: data.tentaixe,
            sodienthoai: data.sodienthoai,
            sotienno: data.sotienno,
            sohdttxn:"",
            status01: 0, // 0. chưa thanh toán. 1. đã thanh toán
            status02: data.status02, // 0. không ghi công nợ. 1 . có ghi công nợ
            status03: 0, 
            status04: 0,
            status05: 0,
            ghichu: data.ghichu
        });
        await Congnoxengoai.collection.insertOne(cnxengoai, {session});
    }
}

module.exports = RegisterCongNoXeNgoaiProcess;