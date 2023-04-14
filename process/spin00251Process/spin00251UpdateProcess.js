const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
const _ = require("lodash");

class Spin00251UpdateProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let ret = 0;

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

        if(update) {
            ret = 0;
        } else {
            ret = 1;
        }
    }

    async updatePNH(db,data,session,ret) {
        const PNH = db.models.phieunhaphang;

    }
}