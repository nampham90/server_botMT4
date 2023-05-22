const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
const _ = require("lodash");
const {ObjectId} = require('mongodb');
// process
const CommonGhinhatkyhethongProcess = require("../commonProcess/commonGhinhatkyhethongProcess");

class Spch00201UpdateTiencuocxengoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async updateTiencuocxengoai(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        await this.updateTiencuocChiTietChuyenNgoai(db,data,session);
        await this.updateTiencuocNhatkykh(db,data,session);
        await this.ghinhatkyhethong(db,data,session);
        return 1;
    }

    // 1. cập nhật "tiencuoc" trong table chitietchuyenngaoi
    async updateTiencuocChiTietChuyenNgoai(db, data, session) {
        const CTCN = db.models.chitietchuyenngoai;
        await CTCN.collection.updateOne(
            { 
                idchuyenngoai: ObjectId(data.idchuyenngoai),
                tiencuoc: data.tiencuoc,
                thongtindonhang: data.thongtindonhang,
                sdtnguoinhan: data.sdtnguoinhan
            },
            {$set:{tiencuoc: data.tiencuocupdate}},
            {session}
        );
    }
    // 2. cập nhật "tiencuoc" trong table nhatkykh
    async updateTiencuocNhatkykh(db,data,session) {
        const Nhatkykh = db.models.nhatkykh;
        //idNhatkykh
        await Nhatkykh.collection.updateOne(
            {_id: ObjectId(data.idNhatkykh)},
            {$set:{sotien: data.tiencuocupdate}},
            {session}
        );
    }
    // 3. ghi nhật ký hệ thông có thay đổi tiền cước
    async ghinhatkyhethong(db,data,session) {
        const commonGhinhatkyhethongProcess = new CommonGhinhatkyhethongProcess(db);
        await commonGhinhatkyhethongProcess.ghinhatkyhethong(data,session);
    }

}

module.exports = Spch00201UpdateTiencuocxengoaiProcess;