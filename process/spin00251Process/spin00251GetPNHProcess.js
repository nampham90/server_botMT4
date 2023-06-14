const AbsProcess = require("../abstractProcess/Transaction");
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
                    "noidungdonhang": element.noidungdonhang,
                    "tiencuoc": element.tiencuoc,
                    "diadiembochang": element.diadiembochang,
                    "soluong": element.soluong,
                    "trongluong": element.trongluong,
                    "khoiluong": element.khoiluong,
                    "donvitinh": element.donvitinh,
                    "makho": element.makho,
                    "tennguoinhan": element.tennguoinhan,
                    "sdtnguoinhan": element.sdtnguoinhan,
                    "diachinguoinhan": element.diachinguoinhan,
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
                    "bocxep": cpdtdonhang.dichvuboxep,
                    "sotienbocxep": cpdtdonhang.sotienbocxep,
                    "htttbocxep": cpdtdonhang.htttbocxep,
                    "ghichu": element.ghichu
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