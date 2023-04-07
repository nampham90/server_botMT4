const Transaction = require('../abstractProcess/Transaction');
const db = require("../../model");


class UserGetDetailProcess extends Transaction {
    constructor(dbcon) {
        super(dbcon);
    }

    async getDetail(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let User = db.models.user;
        let user = await User.collection.findOne({_id:data},{session});
        if(!user) return null;
        return user;
    }

}
module.exports = UserGetDetailProcess;