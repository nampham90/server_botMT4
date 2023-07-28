const AbsProcess = require("../../../process/abstractProcess/Transaction");
const Const = require("../../../common/const");
const _ = require("lodash");
const {ObjectId} = require('mongodb');
// process
const CommonGhinhatkyhethongProcess = require("../../../process/commonProcess/commonGhinhatkyhethongProcess");

class Spch00201UpdateTiencuocSoIDProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async updateTiencuocSoID(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        await this.updateTiencuocPNH(db,data,session);
        await this.ghinhatkyhethong(db,data,session);
        return 1;
    }

    // 1. cập nhật "tiencuoc" trong table phieunhaphang
    async updateTiencuocPNH(db, data, session) {
        const PNH = db.models.phieunhaphang;
        await PNH.collection.updateOne(
            {soID: data.soID},
            {$set:{tiencuoc: data.tiencuocupdate, strrsrv1: data.lydo}},
            {session}
        );
    }
    // 3. ghi nhật ký hệ thông có thay đổi tiền cước
    async ghinhatkyhethong(db,data,session) {
        const commonGhinhatkyhethongProcess = new CommonGhinhatkyhethongProcess(db);
        await commonGhinhatkyhethongProcess.ghinhatkyhethong(data,session);
    }

}

module.exports = Spch00201UpdateTiencuocSoIDProcess;