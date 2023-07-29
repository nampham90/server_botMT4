const AbsProcess = require("../../../process/abstractProcess/Transaction");

const {ObjectId} = require('mongodb');
class Spch00251HuychuyenngoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async huychuyenngoai(data,session) {
        return this.execute(this.database,data,session);
    }

    paramsSearch(data) {
        let search = {};
        if(data.idchuyenngoai) {
            search.idchuyenngoai = ObjectId(data.idchuyenngoai);
        }
        return search;
    }

    async process(db,data,session) {
        // 1. cập nhật nhật lài tiencuoc=, status02 = 0 ở phieunhaphang . nếu đơn này lấy từ kho
        // 2. xóa chi tiết chuyên ngoài
        // 3. xóa chuyến ngoài
        let search = this.paramsSearch(data);
        const CTchuyenngoai = db.models.chitietchuyenngoai;
        let lst = await CTchuyenngoai.find(search);
        //1
        await this.updatePNH(db,lst,session);
        //2
        await this.deleteChitietchuyenngoai(db,data,session);
        //3
        await this.deleteChuyenngoai(db,data,session);

        return 1;
    }

    //1  cập nhật nhật lài tiencuoc=, status02 = 0 ở phieunhaphang
    async updatePNH(db,lst,session) {
        const PNH = db.models.phieunhaphang;
        for(let element of lst) {
            if(element['soid'] && element['soid'] != "") {
                await PNH.collection.updateOne(
                    {soID:element['soid']},
                    {$set: {
                        tiencuoc: element['tiencuoc'],
                        status02: 0
                    }},
                    {session}
                )
            }
        }
    }
    //2. xoa chi tiet chuyen ngoai
    async deleteChitietchuyenngoai(db,data,session) {
        const Congnoxengoai = db.models.congnoxengoai;
        const CTchuyenngoai = db.models.chitietchuyenngoai;
        const Nhatkykh = db.models.nhatkykh;
        let lstct = await CTchuyenngoai.find({idchuyenngoai:ObjectId(data.idchuyenngoai)});
        let lstiddonhang = [];
        for(let element of lstct) {
            lstiddonhang.push(element['_id']);
        }
        //
        //xóa nhát ký công nợ
        await Nhatkykh.deleteMany({ status01: { $regex: new RegExp(lstiddonhang.join('|'), 'i') } });
        //1 xoa công nợ chuyến ngoài
        await Congnoxengoai.collection.deleteMany({iddonhang: {$in: lstiddonhang}},{session});
        //2 xóa chi tiết chuyên ngoài
        await CTchuyenngoai.collection.deleteMany({idchuyenngoai:ObjectId(data.idchuyenngoai)},{session});

    }

    //3. xoa chuyen ngoai
    async deleteChuyenngoai(db,data,session) {
        const Chuyenngoai = db.models.chuyenngoai;
        await Chuyenngoai.collection.deleteOne({_id:ObjectId(data.idchuyenngoai)},{session});
    }
}

module.exports = Spch00251HuychuyenngoaiProcess