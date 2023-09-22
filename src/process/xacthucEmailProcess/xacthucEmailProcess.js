
const AbstractProcess = require('../abstractProcess/AbstractProcess');
const {ObjectId} = require('mongodb');
class XacthucEmailProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async xacthucemail(id, session) {
        return this.execute(this.database,id,session);
    }

    async process(db, id, session) {
        const User = db.models.user;
        let u = await User.findOne({_id: ObjectId(id)});
        if(u) {
            await User.collection.updateOne({_id: ObjectId(id)},{$set: {lastLoginTime: new Date()}});
            return true;
        } else {
            return false;
        }
    }
}

module.exports = XacthucEmailProcess;