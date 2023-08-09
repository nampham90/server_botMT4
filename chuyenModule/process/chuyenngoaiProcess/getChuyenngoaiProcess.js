const AbsProcess = require("../../../process/abstractProcess/Transaction");
let commonfun = require('../../../common/functionCommon');
const { ObjectId } = require('mongodb');

class GetChuyenNgoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getDetail(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const Chuyenngoai = db.models.chuyenngoai;
        const PNH = db.models.phieunhaphang;

        let cn = await Chuyenngoai.findOne({soodn: data.soODN});

        let lstdetail = await PNH.find({soODN: data.soODN});
        let res = {
            spch00251Header: cn,
            spch00251Listdetail: lstdetail,
            mode: data.mode
        }
        return res;
    }
}

module.exports = GetChuyenNgoaiProcess;

