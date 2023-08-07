const AbsProcess = require("../../../process/abstractProcess/Transaction");

let commonfun = require('../../../common/functionCommon');
const { ObjectId } = require('mongodb')
const GetChuyenNgoaiProcess = require('../chuyenngoaiProcess/getChuyenngoaiProcess');
class CreateChuyenngoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async create(data,session) {
        return this.execute(this.database,data,session);
    }

    async updatePNH(db,lstupdate,idcn,soODN,session) {
        const Phieunhaphang = db.models.phieunhaphang;
        for(let element of lstupdate) {
           let rs =  await Phieunhaphang.collection.updateOne(
                {soID : element.soID},
                {$set : {
                    idchuyenngoai:ObjectId(idcn),
                    soODN:soODN,
                    trangthai: 2,
                    status02: element.status02,
                    status03: element.status03
                 }},{session});
            console.log(rs);
        }
    }

    async insertPNH(db,lstcreate,idcn,soODN,iduser,ngayvanchuyen,session) {
        const Phieunhaphang = db.models.phieunhaphang;
        for(let element of lstcreate) {
            let soID = await commonfun.fnGetID();
            let newPNH = {
                soID: soID,
                soODT: null,
                soODN: soODN,
                idchuyen: null,
                idchuyenngoai: ObjectId(idcn),
                biensoxe: null,
                iduser: ObjectId(element.iduser),
                cpdvtncd: null,
                tiencuoc: element.tiencuoc,
                lotrinh: null,
                ngaynhapdudinh: new Date(),
                ngaynhapthucte: new Date(),// ngay thuc tế nhâp hàng
                ngayvanchuyen: ngayvanchuyen, // ngày vận chuyển
                ngaytrahang: null, // ngày trả hàng
                tenhang: element.tenhang,
                soluong: element.soluong,
                soluongthucte: element.soluong,
                trongluong: element.trongluong,
                khoiluong: element.khoiluong,
                donvitinh: element.donvitinh,
                diadiembochang: element.diadiembochang,
                tennguoinhan: element.tennguoinhan,
                sdtnguoinhan: element.sdtnguoinhan,
                diachinguoinhan: element.diachinguoinhan,
                makho: element.diadiembochang,
                hinhthucthanhtoan: element.hinhthucthanhtoan,
                ghichu: element.ghichu,
                trangthai: 0,
                chiphidenhang: 0, // sô tiền đền hàng. 
                lydodenhang: null, // cập nhật ly do đền hàng
                status01: null,
                status02: element.status02,
                status03: element.status03,
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
                nguoiphathanh: ObjectId(iduser),
                soHDTTCN: null
            }
          let rs =  await Phieunhaphang.collection.insertOne(newPNH,{session});
          console.log(rs);
        }

    }

    async process(db,data,session) {
        const Chuyenngoai = db.models.chuyenngoai;
        let spch00251Header = data.spch00251Header;
        let lstdetail = data.spch00251Listdetail;
        // tạo mã chuyến ngoài. so ODN
        let soODN = await commonfun.fnGetODN();
        let newChuyenngoai = new Chuyenngoai({
            ngaynhap: spch00251Header.ngaynhap,
            ngayvanchuyen: spch00251Header.ngayvanchuyen,
            ngaydukiengiaohang: spch00251Header.ngaydukiengiaohang,
            nguonxe: ObjectId(spch00251Header.nguonxe), // id nguon xe
            soodn: soODN,
            hinhthucthanhtoan: spch00251Header.hinhthucthanhtoan,
            biensoxe: spch00251Header.biensoxe,
            sdtnguonxe: spch00251Header.sdtnguonxe,
            tentaixe: spch00251Header.tentaixe,
            sodienthoai: spch00251Header.sodienthoai,
            listID: [],
            status01: 0,
            status02: 0,
            status03: 0,
            status04: 0,
            status05: 0,
            ghichu: spch00251Header.ghichu
        });
        let rs = await Chuyenngoai.collection.insertOne(newChuyenngoai,{session});
        console.log(rs);
        if(rs['insertedId']) {
            let lstUpdate = [];
            let lstCreate = [];
            for(let element of lstdetail) {
               element['soID'] && element['soID'] != "" ? lstUpdate.push(element) : lstCreate.push(element)
            }
            await this.insertPNH(db,lstCreate,rs['insertedId'], soODN, data.nguoiphathanh, spch00251Header.ngayvanchuyen, session);
            await this.updatePNH(db,lstUpdate,rs['insertedId'], soODN, session);

            return soODN;
        }
        return null
    }
}

module.exports = CreateChuyenngoaiProcess;