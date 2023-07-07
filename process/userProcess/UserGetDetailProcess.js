const AbstractProcess = require('../abstractProcess/AbstractProcess');
const { ObjectId } = require('mongodb');


class UserGetDetailProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async getDetail(id,session) {
        return this.execute(this.database,id,session);
    }

    async process(db,id,session) {
        const User = db.models.user;
        let u = await User.findOne({_id: ObjectId(id)},{password:0,menulist:0})
        .populate('avatar');
        return u;
    }

}
module.exports = UserGetDetailProcess;