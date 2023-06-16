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
     await this.updateCPDT(db,data,session);
        if(update) {
            ret = 0;
        } else {
            ret = 1;
        }
    }

    async updateCPDT(db,data,session) {
        const CPDT = db.models.chiphidutrudonhang;
        const CNXN = db.models.congnoxengoai;
        const CNDVTN = db.models.tmt061_congnodichvuthuengoai;
        let soID = data['spin00251Header']['soID'];
        for(let element of data['listsp']) {
            await CPDT.collection.updateOne(
                {soID: soID},
                { $set: {
                    tangbonhaphang: element.nguonxenhaphang,
                    sotiennhaphang: element.sotiennhaphang,
                    htttnhaphang: element.htttnhaphang,
                    tentaixenhaphang: element.tentaixenhaphang,
                    biensoxenhaphang: element.biensoxenhaphang,
                    tangbotrahang: element.nguonxetrahang,
                    sotientrahang: element.sotientrahang,
                    httttrahang: element.httttrahang,
                    tentaixetrahang: element.tentaixetrahang,
                    biensoxetrahang: element.biensoxetrahang,
                    dichvuxecau: element.xecau,
                    sotienxecau: element.sotienxecau,
                    htttxecau: element.htttxecau,
                    dichvuboxep: element.bocxep,
                    sotienbocxep: element.sotienbocxep,
                    htttbocxep: element.htttbocxep
                  }
                },
                {session}
            );
            // 1. kiểm tra dử liệu ghi cong no nhap hang
            let checknh = await CNXN.findOne({soID: soID, nguonxe: ObjectId(element.nguonxenhaphang)});
            if(element.htttnhaphang == 0) {
                if(checknh) {
                    // update thong tin
                    await this.updateCNXN(CNXN,element.nguonxenhaphang, soID, element.biensoxenhaphang,element.tentaixenhaphang,element.sotiennhaphang,session);
                } else {
                    // insert tong tin
                    await this.insertCNXN(CNXN, element.nguonxenhaphang, soID, element.biensoxenhaphang,element.tentaixenhaphang,element.sotiennhaphang,session)
                }
            } else if(element.htttnhaphang == 1) {
                if(checknh) {
                    await this.delettCNXN(CNXN,element.nguonxenhaphang,soID,session);
                }

            }

            // 2. kiểm tra dử liệu ghi cong no tra hang
            let checkth = await CNXN.findOne({soID: soID, nguonxe: ObjectId(element.nguonxetrahang)});
            if(element.httttrahang == 0) {
                
                if(checkth) {
                    // update thong tin
                    await this.updateCNXN(CNXN, element.nguonxetrahang, soID, element.biensoxetrahang,element.tentaixetrahang,element.sotientrahang,session);
                } else {
                    // insert tong tin
                    await this.insertCNXN(CNXN, element.nguonxetrahang, soID, element.biensoxetrahang,element.tentaixetrahang,element.sotientrahang,session)
                }
            } else if(element.httttrahang == 1) {
                if(checkth) {
                    await this.delettCNXN(CNXN,element.nguonxetrahang,soID,session);
                }
            }

            // 3. kiem tra du lieu cong no thue ngoai xecau
            let checkcntnxc = await CNDVTN.findOne({soID: soID, manhacungcap: ObjectId(element.xecau)});
            if(element.htttxecau == 0) {
                if(checkcntnxc) {
                    // update thong tin
                    await this.updateCNDVTN(CNDVTN, soID,element.xecau,element.sotienxecau,session);
                } else {
                    // insert thong tin
                    await this.insertCNDVTN(CNDVTN, soID,element.xecau,element.sotienxecau,session);
                }
            } else if (element.htttxecau == 1) {
                if(checkcntnxc) {
                   await this.delettCNDVTN(CNDVTN,element.xecau,soID,session);
                }
            }

            // 3. kiem tra du lieu cong no thue ngoai boc xep
            let checkcntnbx = await CNDVTN.findOne({soID: soID, manhacungcap: ObjectId(element.bocxep)});
            if(element.htttbocxep == 0) {
                if(checkcntnbx) {
                    // update thong tin
                    await this.updateCNDVTN(CNDVTN, soID,element.bocxep,element.sotienbocxep,session);
                } else {
                    // insert thong tin
                    await this.insertCNDVTN(CNDVTN, soID,element.bocxep,element.sotienbocxep,session)
                }
            } else if (element.htttbocxep == 1) {
                if(checkcntnbx) {
                   await this.delettCNDVTN(CNDVTN,element.bocxep,soID,session);
                }
            }
        }
    }

    async updateCNXN(CNXN, nguonxe, soID, biensoxe, tentaixe, sotienno ,session) {
        await CNXN.collection.updateOne(
            {nguonxe: ObjectId(nguonxe), soID: soID}, 
            {$set: {
                biensoxe: biensoxe,
                tentaixe: tentaixe,
                sotienno: sotienno
               }
            },{session})
    };

    async insertCNXN(CNXN ,nguonxe, soID, biensoxe, tentaixe, sotienno ,session) {
        let newCnxnnhaphang = new CNXN({
            nguonxe: ObjectId(nguonxe),
            iddonhang: null,
            soID: soID,
            ngaynhap : moment().toDate(),
            biensoxe: biensoxe,
            tentaixe: tentaixe,
            sodienthoai: null,
            sotienno: sotienno,
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
    };

    async delettCNXN(CNXN, nguonxe, soID,session) {
       let rs = await CNXN.collection.deleteOne({nguonxe: ObjectId(nguonxe),soID:soID},{session});
       console.log(rs);
    }

    async updateCNDVTN(CNDVTN, soID, manhacungcap, sotien, session) {
        await CNDVTN.collection.updateOne(
            {manhacungcap: ObjectId(manhacungcap), soID: soID}, 
            {$set: {
                sotien: sotien
               }
            },{session})
    };

    async insertCNDVTN(CNDVTN, soID, manhacungcap, sotien, session) {
        let newCNDVTN = new CNDVTN({
            soID: soID,
            manhacungcap: ObjectId(manhacungcap),
            sotien: sotien,
            ngaylamviec:moment().toDate(),
            status01: "0", // "0" chưa thanh toán. "1 đã thanh toán"
            status02: "0", 
            status03: "0", 
            status04: "0",
            status05: "0"
        })
        let rs = await CNDVTN.collection.insertOne(newCNDVTN, { session });
        console.log(rs);
    }

    async delettCNDVTN(CNDVTN, manhacungcap, soID, session) {
       let rs = await CNDVTN.collection.deleteOne({soID:soID,manhacungcap:ObjectId(manhacungcap)},{session});
       console.log(rs);
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
                    trongluong: element.trongluong,
                    khoiluong: element.khoiluong,
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