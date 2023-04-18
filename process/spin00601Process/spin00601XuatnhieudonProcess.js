const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');

class Spin00601XuatnhieudonProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async xuatnhieudon(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let i = 0;
        // update idchuyen, bienxose, status02 =1 trình cho phieu nhap hang, chuyên đơn hàng sang trang thái vận chuyển. không được quyền hủy đơn hàng
        for(let element of data.soIDs) {
            await this.updateDetail(db,element,data,session);
            i++;
        }
        return i;
    }

    async updateDetail(db,soID,data,session) {
        const PNH = db.models.phieunhaphang;
        await PNH.collection.updateOne(
            {soID: soID},
            {$set: {
                idchuyen: ObjectId(data.id),
                biensoxe: data.biensoxe,
                lotrinh: data.lotrinh,
                status02: 1
            }},
            {session}
        )
    }
}

module.exports = Spin00601XuatnhieudonProcess;