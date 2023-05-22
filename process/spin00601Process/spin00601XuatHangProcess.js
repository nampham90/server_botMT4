const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
class Spin00601XuatHangProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async xuathang(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        // update idchuyen, bienxose, status02 =1 trình cho phieu nhap hang, chuyên đơn hàng sang trang thái vận chuyển. không được quyền hủy đơn hàng
        const PNH = db.models.phieunhaphang;
        let res = await PNH.collection.updateOne(
            {soID: data.soID},
            {$set: {
                idchuyen: ObjectId(data.id),
                biensoxe: data.biensoxe,
                lotrinh: data.lotrinh,
                status02: 1
            }},
            {session}
        )

        return res;
    }
}

module.exports = Spin00601XuatHangProcess;