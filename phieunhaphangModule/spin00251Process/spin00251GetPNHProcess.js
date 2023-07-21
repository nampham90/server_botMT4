const AbsProcess = require("../../process/abstractProcess/Transaction");
const Const = require("../../common/const");
const _ = require("lodash");

class Spin00251GetPHNProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getPHN(req,session) {
        return this.execute(this.database,req,session);
    }

    async process(db,req,session) {
       let listsp = await this.getListsp(db,req,session);
       let header = await this.getHeader(db,req,session);
       
       let res = {
          "header": header,
          "listsp": listsp
       }
       return res;
    }

    async getHeader(db,req,session) {
        const TIN100 = db.models.tin100;
        let tin100res = await TIN100.findOne({soID:req.soID})
        .populate('iduser',{password:0});
        return tin100res;
    }

    async getListsp(db,req,session) {
        const PNH = db.models.phieunhaphang;
        let reslist= [];
        let lstPNH = await PNH.find({soID:req.soID});
        let cpdtdonhang = await this.getCPDT(db,req,session);
        for(let element of lstPNH) {
            if(element.soID == cpdtdonhang.soID) {
                let item = {
                    "id": element._id,
                    "soID": element.soID,
                    "soODT": element.soODT,
                    "soODN": element.soODN,
                    "idchuyen": element.idchuyen,
                    "idchuyenngoai": element.idchuyenngoai,
                    "biensoxe": element.biensoxe,
                    "tenhang": element.tenhang,
                    "tiencuoc": element.tiencuoc,
                    "lotrinh": element.lotrinh,
                    "diadiembochang": element.diadiembochang,
                    "soluong": element.soluong,
                    "soluongthucte": element.soluongthucte,
                    "trongluong": element.trongluong,
                    "khoiluong": element.khoiluong,
                    "donvitinh": element.donvitinh,
                    "makho": element.makho,
                    "tennguoinhan": element.tennguoinhan,
                    "sdtnguoinhan": element.sdtnguoinhan,
                    "diachinguoinhan": element.diachinguoinhan,
                    "ghichu": element.ghichu,
                    "trangthai": element.trangthai,
                    "chiphidenhang": element.chiphidenhang,
                    "lydodenhang": element.lydodenhang,
                    "status01": element.status01,
                    "status02": element.status02,
                    "status03": element.status03,
                    "status04": element.status04,
                    "status05": element.status05,
                    "status06": element.status06,
                    "status07": element.status07,
                    "status08": element.status08,
                    "status09": element.status09,
                    "status10": element.status10,
                    "strrsrv1": element.strrsrv1,
                    "strrsrv2": element.strrsrv2,
                    "strrsrv3": element.strrsrv3,
                    "strrsrv4": element.strrsrv4,
                    "strrsrv5": element.strrsrv5,
                    "strrsrv6": element.strrsrv6,
                    "strrsrv7": element.strrsrv7,
                    "strrsrv8": element.strrsrv8,
                    "strrsrv9": element.strrsrv9,
                    "strrsrv10": element.strrsrv10,
                    "nguoiphathanh": element.nguoiphathanh,
                    "soHDTTCN": element.soHDTTCN,
                    "nguonxenhaphang": cpdtdonhang.tangbonhaphang,
                    "sotiennhaphang": cpdtdonhang.sotiennhaphang,
                    "htttnhaphang": cpdtdonhang.htttnhaphang,
                    "tentaixenhaphang": cpdtdonhang.tentaixenhaphang,
                    "biensoxenhaphang": cpdtdonhang.biensoxenhaphang,
                    "nguonxetrahang": cpdtdonhang.tangbotrahang,
                    "sotientrahang": cpdtdonhang.sotientrahang,
                    "httttrahang": cpdtdonhang.httttrahang,
                    "tentaixetrahang": cpdtdonhang.tentaixetrahang,
                    "biensoxetrahang": cpdtdonhang.biensoxetrahang,
                    "xecau": cpdtdonhang.dichvuxecau,
                    "sotienxecau": cpdtdonhang.sotienxecau,
                    "htttxecau": cpdtdonhang.htttxecau,
                    "bocxep": cpdtdonhang.dichvubocxep,
                    "sotienbocxep": cpdtdonhang.sotienbocxep,
                    "htttbocxep": cpdtdonhang.htttbocxep
                }
                reslist.push(item);
            }
        }
        return reslist;
    }

    async getCPDT(db,req, session) {
        const CPDT = db.models.chiphidutrudonhang;
        let cpdtdonhang = await CPDT.findOne({soID:req.soID});
        return cpdtdonhang;
    }

}

module.exports = Spin00251GetPHNProcess