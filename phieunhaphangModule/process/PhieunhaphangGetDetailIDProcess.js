const AbsProcess = require("../../process/abstractProcess/Transaction");

class PhieunhaphangGetDetailIDProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getDetailID(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const PNH = db.models.phieunhaphang;
        let p = await PNH.findOne({soID: data.soID})
        .populate({
            path: "cpdvtncd",
            populate: [
              { path: "tangbonhaphang" },
              { path: "tangbotrahang" },
              { path: "dichvuxecau" , populate: [{path: "loaidichvu"}]},
              { path: "dichvubocxep", populate: [{path: "loaidichvu"}] }
            ],
            match: { cpdvtncd: { $ne: null } }
        });
        return p;
    }
}

module.exports = PhieunhaphangGetDetailIDProcess;