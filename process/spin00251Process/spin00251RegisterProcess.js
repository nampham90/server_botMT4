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
        const DVTN = db.models.chiphidutrudonhang;
        let listPNH = [];
        let listDVTN = [];
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
            let dvtn = {
                soID: data.soID,
                tangbonhaphang: ObjectId(element['nguonxenhaphang']),
                sotiennhaphang: element['sotiennhaphang'],
                htttnhaphang: element['htttnhaphang'],
                tentaixenhaphang: element['tentaixenhaphang'],
                biensoxenhaphang: element['biensoxenhaphang'],
                tangbotrahang: ObjectId(element['nguonxetrahang']),
                sotientrahang: element['sotientrahang'],
                httttrahang: element['httttrahang'],
                tentaixetrahang: element['tentaixetrahang'],
                biensoxetrahang: element['biensoxetrahang'],
                dichvuxecau: ObjectId(element['xecau']),
                sotienxecau: element['sotienxecau'],
                htttxecau: element['htttxecau'],
                dichvuboxep: ObjectId(element['bocxep']),
                sotienbocxep: element['sotienbocxep'],
                htttboxep: element['htttboxep'],
                status01: "",
                status02: "",
                status03: "",
                status04: "",
                status05: ""
            }
            if(dvtn.htttxecau != 1 && element['xecau'] != null && element['sotienxecau'] != 0) {
                // ghi no xe cau
                const TMT061xecau =  db.models.tmt061_congnodichvuthuengoai;
                let newTmt061xecau = new TMT061xecau({
                    soID: data.soID,
                    manhacungcap: ObjectId(element['xecau']),
                    sotien:  element['sotienxecau'],
                    ngaylamviec:moment().toDate(),
                    status01: "0", // "0" chưa thanh toán. "1 đã thanh toán"
                    status02: "0", 
                    status03: "0", 
                    status04: "0",
                    status05: "0"
                })
                await TMT061xecau.collection.insertOne(newTmt061xecau, { session });
            }
            if(dvtn.htttboxep != 1 && element['bocxep'] != null && element['sotienboxep'] != 0) {
                // ghi no boc xep
                const TMT061bocxep =  db.models.tmt061_congnodichvuthuengoai;
                let newTmt061bocxep = new TMT061bocxep({
                    soID: data.soID,
                    manhacungcap: ObjectId(element['bocxep']),
                    sotien:  element['sotienboxep'],
                    ngaylamviec:moment().toDate(),
                    status01: "0", // "0" chưa thanh toán. "1 đã thanh toán"
                    status02: "0", 
                    status03: "0", 
                    status04: "0",
                    status05: "0"
                })
                await TMT061bocxep.collection.insertOne(newTmt061bocxep, { session });
            }

            listPNH.push(pn);
            listDVTN.push(dvtn);
        }
        let rs = await PNH.collection.insertMany(listPNH, { session });
        let rs1 = await DVTN.collection.insertMany(listDVTN, { session });

        // lây id dvth
        //let itemdvth = await DVTN.findOne({soID: data.soID});
        // update vào phieunhaphang
        if(rs1.insertedIds) {
            await PNH.collection.updateOne({soID: data.soID},{$set: {cpdvtncd: ObjectId(rs1.insertedIds['0'])}},{ session })
        }

        if(rs['acknowledged'] === true) {
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