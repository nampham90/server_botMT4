const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
const _ = require("lodash");
const {ObjectId} = require('mongodb');
const moment = require('moment');
const CommonCheckSoIDProcess = require("../commonProcess/commonCheckSoIDProcess");
class Spin00251UpdateProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let ret = 0;
        let soID = data['spin00251Header']['soID'];
        const commonCheckSoIDProcess = new CommonCheckSoIDProcess(this.database);
        let checkSoID = await commonCheckSoIDProcess.checkSoID(soID,session);
        if(checkSoID == 1) {
            ret = 1;
        } else {
            await this.updateTIN100(db,data,session,ret)
            await this.updatePNH(db,data,session,ret);
        }
        return ret;
    }

    async updateTIN100(db,data,session,ret) {
        const TIN100 = db.models.tin100;
        let soID = data['spin00251Header']['soID'];
        let update = await TIN100.collection.updateOne(
            {soID: soID},
            {$set: {
                iduser: data['spin00251Header']['iduser'],
                hinhthucthanhtoan: data['spin00251Header']['hinhthucthanhtoan'],
                ghichu: data['spin00251Header']['ghichu']
            }},
            {session}
        )
        if(update) {
            ret = 0;
        } else {
            ret = 1;
        }
    }

    async updatePNH(db,data,session,ret) {
        const PNH = db.models.phieunhaphang;
        let listsp = data['listsp'];
        for(let element of listsp) {
            await PNH.collection.updateOne(
                {_id: ObjectId(element.id)},
                {$set: {
                    soID: element.soID,
                    idchuyen: element.idchuyen,
                    biensoxe: element.biensoxe,
                    iduser: ObjectId(data['spin00251Header']['iduser']),
                    tiencuoc: element.tiencuoc,
                    lotrinh: element.lotrinh,
                    ngaynhap: moment(element.ngaynhap).toDate(),
                    noidungdonhang: element.noidungdonhang,
                    soluong: element.soluong,
                    donvitinh: element.donvitinh,
                    diadiembochang: element.diadiembochang,
                    tennguoinhan: element.tennguoinhan,
                    sdtnguoinhan: element.sdtnguoinhan,
                    diachinguoinhan: element.diachinguoinhan,
                    makho: element.makho,
                    hinhthucthanhtoan: data['spin00251Header']['hinhthucthanhtoan'],
                    ghichu: element.ghichu,
                    trangthai: element.trangthai,
                    status01: element.status01,
                    status02: element.status02,
                    status03: element.status03,
                    status04: element.status04,
                    status05: element.status05
                }},
                {session}
            )
        }

    }
}

module.exports = Spin00251UpdateProcess