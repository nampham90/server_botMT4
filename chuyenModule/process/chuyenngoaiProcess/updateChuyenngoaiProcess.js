const AbsProcess = require("../../../process/abstractProcess/Transaction");
const { ObjectId } = require('mongodb')
let commonfun = require('../../../common/functionCommon');

class UpdateChuyenngoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        // update chuyến ngoài
        if(data.spch00251Header.status05 == 1) {
            // update chuyến ngoài
            await this.updateCN(db,data,session);
        }
        // kiểm tra phân loài pnh . 
        if(data.spch00251Listdetail.length > 0) {
            for(let element of data.spch00251Listdetail) {
                switch(element.strrsrv10) {
                    case "CREATE" : await this.createPNH(db, data, element, session); break;
                    case "UPDATE" : await this.updatePNH(db, data, element, session); break;
                    case "HUY" : await this.huyPNH(db, data, element, session); break;
                }
            }
        }
        return data.spch00251Header.soodn;
    }

    // update chuyen ngoai
    async updateCN(db, data, session) {
        const Chuyenngoai = db.models.chuyenngoai;
        await Chuyenngoai.collection.updateOne({soodn: data.spch00251Header.soodn},{
            $set: {
                ngaynhap: data.spch00251Header.ngaynhap,
                ngayvanchuyen: data.spch00251Header.ngayvanchuyen,
                ngaydukiengiaohang: data.spch00251Header.ngaydukiengiaohang,
                hinhthucthanhtoan: data.spch00251Header.hinhthucthanhtoan,
                biensoxe: data.spch00251Header.biensoxe,
                sdtnguonxe: data.spch00251Header.sdtnguonxe,
                tentaixe: data.spch00251Header.tentaixe,
                sodienthoai: data.spch00251Header.sodienthoai,
                ghichu: data.spch00251Header.ghichu
            }   
        }, {session})
    }

    // create phieu nhap hang
    async createPNH(db, data, detail, session) {
        const Chuyenngoai = db.models.chuyenngoai;
        const PNH = db.models.phieunhaphang;
        const cn = await Chuyenngoai.findOne({soodn:data.spch00251Header.soodn})
        let soID = await commonfun.fnGetID();
        let newPNH = {
            soID: soID,
            soODT: null,
            soODN: data.spch00251Header.soodn,
            idchuyen: null,
            idchuyenngoai: ObjectId(cn._id),
            biensoxe: null,
            iduser: ObjectId(detail.iduser),
            cpdvtncd: null,
            tiencuoc: detail.tiencuoc,
            lotrinh: null,
            ngaynhapdudinh: new Date(),
            ngaynhapthucte: new Date(),// ngay thuc tế nhâp hàng
            ngayvanchuyen: data.spch00251Header.ngayvanchuyen, // ngày vận chuyển
            ngaytrahang: null, // ngày trả hàng
            tenhang: detail.tenhang,
            soluong: detail.soluong,
            soluongthucte: detail.soluong,
            trongluong: detail.trongluong,
            khoiluong: detail.khoiluong,
            donvitinh: detail.donvitinh,
            diadiembochang: detail.diadiembochang,
            tennguoinhan: detail.tennguoinhan,
            sdtnguoinhan: detail.sdtnguoinhan,
            diachinguoinhan: detail.diachinguoinhan,
            makho: detail.diadiembochang,
            hinhthucthanhtoan: detail.hinhthucthanhtoan,
            ghichu: detail.ghichu,
            trangthai: 0,
            chiphidenhang: 0, // sô tiền đền hàng. 
            lydodenhang: null, // cập nhật ly do đền hàng
            status01: null,
            status02: detail.status02,
            status03: detail.status03,
            status04: null,
            status05: null,
            status06: null,
            status07: null,
            status08: null,
            status09: null,
            status10: null,
            ngayphathanh: null,
            ngaythanhtoan: null,
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
            nguoiphathanh: ObjectId(data.iduser),
            soHDTTCN: null
        }
        await PNH.collection.insertOne(newPNH,{session});
    }

    // update phieu nhap hang
    async updatePNH(db, data, detail, session) {
        const PNH = db.models.phieunhaphang;
        await PNH.collection.updateOne({soID: detail.soID},{$set: {
            status02: detail.status02,
            status03: detail.status03
        }},{session});
    }


    // huy phieu nhap hang
    async huyPNH(db, data, detail, session) {
        const PNH = db.models.phieunhaphang;
        if(detail.strrsrv9 == "A") {
            await PNH.collection.updateOne({soID: detail.soID},{$set: {
                soODN: null,
                idchuyen: null,
                status02: null,
                status03: null
            }},{session});
        } else if(detail.strrsrv9 == "B") {
            await PNH.collection.deleteOne({soID: detail.soID}, {session});
        }
    }
}

module.exports = UpdateChuyenngoaiProcess;