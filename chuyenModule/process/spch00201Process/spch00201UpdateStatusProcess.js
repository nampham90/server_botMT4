const AbsProcess = require("../../../process/abstractProcess/Transaction");
const Const = require("../../../common/const");
const commonfun = require("../../../common/functionCommon");
const _ = require("lodash");
const {ObjectId} = require('mongodb');
const GhinhatkyhethongProcess = require("../../../process/commonProcess/commonGhinhatkyhethongProcess");
class Spch00201UpdateStatusProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async updateStatus(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const Chuyen = db.models.chuyen;
        const PNH = db.models.phieunhaphang;
        const CPCX = db.models.chiphichuyenxe;
        let c = await Chuyen.findOne({_id:data.id});
        // update trang thai chuyên = 1;
        await Chuyen.collection.updateOne({_id: ObjectId(data.id)},{$set: {trangthai: 1, ngayve: new Date()}}, {session});
        // chuyển trang thai dơn hàng = 3(trạng thái đã giao hàng). phieunhaphang.trangthai = 3;
        let lstID = [];
        for(let element of data.lstdonhang) {
            lstID.push(element['soID']);
        }
        await PNH.collection.updateMany({soID: {$in:lstID}},{$set: {trangthai:3}},{session});
        // thêm danh sách chi phí vào table chi phí.
        for(let element of data.lstchiphi) {
            let cp = new CPCX({
                idchuyen: data.id,
                tenchiphi: element.tenchiphi,
                sotien: element.sotien,
                ghichu: element.ghichu
            });
            await CPCX.collection.insertOne(cp,{session});
        }
        // update trang thai xe sang rảnh
        commonfun.UpdateTrangthaiXe(c['biensoxe'],false);

        // ghi nhat ky he thong
        const ghinhatkyhethongProcess = new GhinhatkyhethongProcess(db);
        let datank = {
            "loaithongbao": 'system',
            "lydo": 'Đã tính chi phí chuyến có sô:  ' +  c['soodt'],
            "iduser": data.userid,
            "hanhdong": "Cập nhật trạng thái chuyến",
            "table": "chuyen"
        }
        await ghinhatkyhethongProcess.ghinhatkyhethong(datank,session)
        return 1;
    }
}

module.exports = Spch00201UpdateStatusProcess;