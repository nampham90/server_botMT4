const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
const moment = require('moment');
class CommonGhinhatkyhethongProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async ghinhatkyhethong(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let ret = 0;
        const Nhatkyhethong = db.models.nhatkyhethong;
        let nkht = new Nhatkyhethong({
            loaithongbao: data.loaithongbao,//notifi | system | vison
            noidung: data.lydo,
            iduser: ObjectId(data.iduser), //hệ thông, người dùng
            hanhdong:data.hanhdong, //update //thêm mới // xóa
            table: data.table, // bảng thực hiẹn
            ngay: moment().toDate(),// ngày thực hiện. 
            status01: "0", //"0" new. "1" xóa
            status02: "0", // "0" chưa xác nhận , "1" đã xác nhận
            status03: "0",
            status04: "0",
            status05: "0"
        })
        let rs =  await Nhatkyhethong.collection.insertOne(nkht, { session });
        if(rs['insertedId']) {
            ret = 0;
        } else {
            ret = 1
        }
    }
}

module.exports = CommonGhinhatkyhethongProcess;