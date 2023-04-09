const Transaction = require('../abstractProcess/Transaction');
const { ObjectId } = require('mongodb');


class UserGetDetailProcess extends Transaction {
    constructor(dbcon) {
        super(dbcon);
    }

    async getDetail(id,session) {
        return this.execute(this.database,id,session);
    }

    async process(db,id,session) {
        const User = db.models.user;
        let u= await User.collection.findOne({_id: ObjectId(id)},{session});
        return u;
    }

}
module.exports = UserGetDetailProcess;