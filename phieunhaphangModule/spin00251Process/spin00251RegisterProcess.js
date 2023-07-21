const AbsProcess = require("../../process/abstractProcess/Transaction");
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
        const CNXN = db.models.congnoxengoai;
        let listPNH = [];
        let listDVTN = [];
        for(let element of data.listsp) {
            let ngaynhapthucte = null;
            let trangthai = 0;
            if(element['soluongthucte'] > 0) {
                ngaynhapthucte =  moment().toDate();
                trangthai = 1;
            }
            let pn = {
                soID: data.soID,
                soODT: null,
                soODN: null,
                idchuyen: null,
                idchuyenngoai: null,
                biensoxe: null,
                iduser: ObjectId(data.iduser),
                cpdvtncd: null,
                tiencuoc: element['tiencuoc'],
                lotrinh: null,
                ngaynhapdudinh: moment().toDate(),
                ngaynhapthucte: ngaynhapthucte,// ngay thuc tế nhâp hàng
                ngayvanchuyen: null, // ngày vận chuyển
                ngaytrahang: null, // ngày trả hàng
                tenhang: element['tenhang'],
                soluong: element['soluong'],
                soluongthucte: element['soluongthucte'],
                trongluong: element['trongluong'],
                khoiluong: element['khoiluong'],
                donvitinh: element['donvitinh'],
                diadiembochang: element['diadiembochang'],
                tennguoinhan: element['tennguoinhan'],
                sdtnguoinhan: element['sdtnguoinhan'],
                diachinguoinhan: element['diachinguoinhan'],
                makho: element['makho'],
                hinhthucthanhtoan: parseInt(data.hinhthucthanhtoan),
                ghichu: element['ghichu'],
                trangthai: trangthai,
                chiphidenhang: 0, // sô tiền đền hàng. 
                lydodenhang: null, // cập nhật ly do đền hàng
                status01: null,
                status02: null,
                status03: null,
                status04: null,
                status05: null,
                status06: null,
                status07: null,
                status08: null,
                status09: null,
                status10: null,
                strrsrv1: null,
                strrsrv2: null,
                strrsrv3: null,
                strrsrv4: null,
                strrsrv5: null,
                strrsrv6: null,
                strrsrv7: null,
                strrsrv8: null,
                strrsrv9: null,
                strrsrv10: null,
                nguoiphathanh: ObjectId(data.nguoiphathanh),
                soHDTTCN: null
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
                dichvubocxep: ObjectId(element['bocxep']),
                sotienbocxep: element['sotienbocxep'],
                htttbocxep: element['htttbocxep'],
                status01: "",
                status02: "",
                status03: "",
                status04: "",
                status05: ""
            }
            if(dvtn.htttnhaphang != 1 && dvtn.tangbonhaphang != null && dvtn.sotiennhaphang > 0) {
                // gi cong no nguon xe nhap hang
                let newCnxnnhaphang = new CNXN({
                    nguonxe: ObjectId(dvtn.tangbonhaphang),
                    iddonhang: null,
                    soID: data.soID,
                    ngaynhap : moment().toDate(),
                    biensoxe: dvtn.biensoxenhaphang,
                    tentaixe: dvtn.tentaixenhaphang,
                    sodienthoai: null,
                    sotienno: dvtn.sotiennhaphang,
                    sohdttxn:"",
                    status01: 0, // 0. chưa thanh toán. 1. đã thanh toán
                    status02: 1, // 0. không ghi công nợ. 1 . có ghi công nợ
                    status03: 0, 
                    status04: 0,
                    status05: 0,
                    ghichu: "NO"
                });
                let rs = await CNXN.collection.insertOne(newCnxnnhaphang,{session});
                console.log(rs);
            }

            if(dvtn.httttrahang != 1 && dvtn.tangbotrahang != null && dvtn.sotientrahang > 0) {
                // gi cong no nguon xe tra hang
                  // gi cong no nguon xe nhap hang
                  let newCnxntrahang = new CNXN({
                    nguonxe: ObjectId(dvtn.tangbotrahang),
                    iddonhang: null,
                    soID: data.soID,
                    ngaynhap : moment().toDate(),
                    biensoxe: dvtn.biensoxetrahang,
                    tentaixe: dvtn.tentaixetrahang,
                    sodienthoai: null,
                    sotienno: dvtn.sotientrahang,
                    sohdttxn:"",
                    status01: 0, // 0. chưa thanh toán. 1. đã thanh toán
                    status02: 1, // 0. không ghi công nợ. 1 . có ghi công nợ
                    status03: 0, 
                    status04: 0,
                    status05: 0,
                    ghichu: "NO"
                });
                let rs = await CNXN.collection.insertOne(newCnxntrahang,{session});
                console.log(rs);
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
                let rs = await TMT061xecau.collection.insertOne(newTmt061xecau, { session });
                console.log(rs);
            }
            if(dvtn.htttbocxep != 1 && element['bocxep'] != null && element['sotienboxep'] != 0) {
                // ghi no boc xep
                const TMT061bocxep =  db.models.tmt061_congnodichvuthuengoai;
                let newTmt061bocxep = new TMT061bocxep({
                    soID: data.soID,
                    manhacungcap: ObjectId(element['bocxep']),
                    sotien:  element['sotienbocxep'],
                    ngaylamviec:moment().toDate(),
                    status01: "0", // "0" chưa thanh toán. "1 đã thanh toán"
                    status02: "0", 
                    status03: "0", 
                    status04: "0",
                    status05: "0"
                })
                let rs = await TMT061bocxep.collection.insertOne(newTmt061bocxep, { session });
                console.log(rs);
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
                tenhang: element['tenhang'],
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