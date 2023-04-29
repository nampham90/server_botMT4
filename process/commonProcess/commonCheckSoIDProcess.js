const AbsProcess = require("../abstractProcess/Transaction");

class CommonCheckSoIDProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async checkSoID(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let ret = 0;
        let checkOptions = [
            {"table": "Tin100", "checked": false},
            {"table": "PhieuNhapHang", "checked": false},
        ]
        let checkTin100 = await this.checkTin100(db,data,session);
        if(checkTin100 == 0) {
            checkOptions[0].checked = true;
        } 
        let checkPNP = await this.checkPNH(db,data,session);
        if(checkPNP == 0) {
            checkOptions[1].checked = true;
        }
        if(checkOptions.every(item=>item.checked)) {
            ret = 0;
        } else {
            ret = 1;
        }
        return ret;
    }

    async checkTin100(db,data,session) {
        const TIN100 = db.models.tin100;
        let t = await TIN100.collection.findOne({soID: data},{session});
        if(t) {
            return 0;
        } 
        return 1;
       
    }

    async checkPNH(db,data,session) {
        const PNH = db.models.phieunhaphang;
        let p = await PNH.collection.findOne({soID: data},{session});
        if(p) {
            return 0;
        } 
        return 1;
    }
}

module.exports = CommonCheckSoIDProcess