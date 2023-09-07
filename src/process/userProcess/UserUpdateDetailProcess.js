const AbstractProcess = require('../abstractProcess/AbstractProcess');
const { ObjectId } = require('mongodb');

class UserUpdateDetailProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async updateDetail(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const User = db.models.user;
        let u= await User.collection.updateOne(
            {_id: ObjectId(data.id)},
            {
                $set: {
                    name: data.name,
                    sex: data.sex,
                    available: data.available,
                    zalo: data.zalo,
                    dienthoai: data.dienthoai,
                    email: data.email,
                    role_id: data.role_id,
                    phongban_id: data.phongban_id
                }
            },
            {session}
        );
        return u;
    }
}

module.exports = UserUpdateDetailProcess;