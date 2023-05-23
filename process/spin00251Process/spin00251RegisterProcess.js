const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
const _ = require("lodash");
const {ObjectId} = require('mongodb');
const moment = require('moment');
class Spin00251RegisterProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async register(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let ret = 0;
        await this.insertTIN100(db,data,session,ret);
        if(data['mode']) {
            await this.TaiXeinsertPhieuNhapHang(db,data,session,ret);
        } else {
            await this.insertPhieuNhapHang(db,data,session,ret);
        }
        return ret;
    }

    async insertTIN100(db,data,session,ret) {
        const TIN100 = db.models.tin100;
        let newTin100 = new TIN100({
            soID: data.soID,//
            iduser: data.iduser,
            ngaynhap: _.now(),
            hinhthucthanhtoan: data.hinhthucthanhtoan,
            ghichu: data.ghichu,
            status01: 0, 
            status02: 0, 
            status03: 0, 
            status04: 0,
            status05: 0
        });
        let rs = await TIN100.collection.insertOne(newTin100, { session });
        if(rs['insertedId']) {
            ret = 0;
        } else {
            ret = 1
        }
    }

    async insertPhieuNhapHang(db,data,session,ret) {
        const PNH = db.models.phieunhaphang;
        let listPNH = [];
        for(let element of data.listsp) {
            let pn = {
                soID: data.soID,
                idchuyen: null,
                biensoxe: null,
                iduser: ObjectId(data.iduser),
                tiencuoc: element['tiencuoc'],
                lotrinh: null,
                ngaynhap: moment().toDate(),
                noidungdonhang: element['noidungdonhang'],
                soluong: element['soluong'],
                trongluong: element['trongluong'],
                khoiluong: element['khoiluong'],
                donvitinh: element['donvitinh'],
                diadiembochang: element['diadiembochang'],
                tennguoinhan: element['tennguoinhan'],
                sdtnguoinhan: element['sdtnguoinhan'],
                diachinguoinhan: element['diachinguoinhan'],
                makho: element['makho'],
                hinhthucthanhtoan: data.hinhthucthanhtoan,
                ghichu: element['ghichu'],
                trangthai: 0,
                status01: 0,
                status02: 0,//0 trong kho , 1 vận chuyển
                status03: 0,
                status04: 0,
                status05: 0
            }
            listPNH.push(pn);
        }
        let rs = await PNH.collection.insertMany(listPNH, { session });
        if(rs['acknowledged'] == true) {
            ret = 0;
        } else {
            ret = 1;
        }
    }

    async TaiXeinsertPhieuNhapHang(db,data,session,ret) {
        const PNH = db.models.phieunhaphang;
        let listPNH = [];
        for(let element of data.listsp) {
            let pn = {
                soID: data.soID,
                idchuyen: ObjectId(element['idchuyen']),
                biensoxe: element['biensoxe'],
                iduser: ObjectId(data.iduser),
                tiencuoc: element['tiencuoc'],
                lotrinh: element['lotrinh'],
                ngaynhap: moment().toDate(),
                noidungdonhang: element['noidungdonhang'],
                soluong: element['soluong'],
                trongluong: element['trongluong'],
                khoiluong: element['khoiluong'],
                donvitinh: element['donvitinh'],
                diadiembochang: element['diadiembochang'],
                tennguoinhan: element['tennguoinhan'],
                sdtnguoinhan: element['sdtnguoinhan'],
                diachinguoinhan: element['diachinguoinhan'],
                makho: element['makho'],
                hinhthucthanhtoan: data.hinhthucthanhtoan,
                ghichu: element['ghichu'] + ", " + data.ghichu,
                trangthai: 0,
                status01: 0,
                status02: 1,//0 trong kho , 1 vận chuyển
                status03: 0,
                status04: 0,
                status05: 0
            }
            listPNH.push(pn);
        }
        let rs = await PNH.collection.insertMany(listPNH, { session });
        if(rs['acknowledged'] == true) {
            ret = 0;
        } else {
            ret = 1;
        }
    }
}

module.exports = Spin00251RegisterProcess