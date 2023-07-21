const AbsProcess = require("../abstractProcess/Transaction");
const { ObjectId } = require("mongodb")

class CommonGhinhatkyNoProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async ghinhatkyno(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const NK = db.models.nhatkykh;
        let newNK = new NK({
            iduser: ObjectId(data.iduser), // mã khách hàng
            trangthai: 0, // 0 nợ, 1 trả
            sotien: data.sotieno, // số tiền nợ hoặc trả
            dchuyen: ObjectId(data.idchuyen),
            idphieunhaphang: null,
            soID: data.soID,
            chukyno: 0,
            hinhthucthanhtoan: null, // hinh thức thánh toán . nếu là nợ thì hình thức thanh toán = null
            ngay: _.now(), // ngày trả hoặc nay nợ . tự động lấy ngày giờ hiện tại
            ghichu: data.ghichu, // ghi chu cần thiết. để đối chiếu với khách hàng
            status01: data.status01,
            status02: data.status02,
            status03: "",
            status04: "",
            status05: ""
        });
        await NK.collection.insertOne(newNK, {session});
    }
}