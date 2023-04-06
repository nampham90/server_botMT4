const Transaction = require('../abstractProcess/Transaction');
const db = require("../../model");


class UserGetDetailProcess extends Transaction {
    constructor(dbcon) {
        super(dbcon);
    }

    async getDetail(data) {
        return this.execute(db,data);
    }

    async process(db,data) {
        let User = db.user;
        let user = await User.findOne({_id:data});
        if(!user) return null;
        return user;
    }

}
module.exports = UserGetDetailProcess;