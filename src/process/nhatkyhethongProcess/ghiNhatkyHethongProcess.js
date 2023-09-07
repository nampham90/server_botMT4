const AbstractProcess = require('../abstractProcess/AbstractProcess');
const { ObjectId } = require('mongodb');
class GhiNhatkyHethongProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async ghinhatkyhethong(data,session) {
      return this.execute(this.database,data,session);
    }

    /*
     param: {
        loaithongbao: data.loaithongbao, //Thông báo chung, thông báo hệ thống, thông báo về kế hoạch sắp tới notifi | system | vison
        noidung: data.noidung,
        iduser: ObjectId(data.iduser), // ID User
        hanhdong: data.hanhdong, // updete || delete || create
        table: data.table, //tên table thay đổi
        ngay: new Date(), // thời gian thực hiện hàn động đó. _now
        status01: data.status01, //
        status02: data.status02, // 
        status03: data.status03,
        status04: data.status04,
        status05: data.status05
     }
    */
    async process(db, data, session) {
      const NKHT = db.models.nhatkyhethong;
      let newNKHT = new NKHT({
        loaithongbao: data.loaithongbao, //Thông báo chung, thông báo hệ thống, thông báo về kế hoạch sắp tới notifi | system | vison
        noidung: data.noidung,
        iduser: ObjectId(data.iduser), // ID User
        hanhdong: data.hanhdong, // updete || delete || create
        table: data.table, //tên table thay đổi
        ngay: new Date(), // thời gian thực hiện hàn động đó. _now
        status01: data.status01, // process thuc hien 
        status02: data.status02, // 
        status03: data.status03,
        status04: data.status04,
        status05: data.status05
      })
      await NKHT.collection.insertOne(newNKHT, { session });
    }
}

module.exports = GhiNhatkyHethongProcess