const AbstractProcess = require('../abstractProcess/AbstractProcess');
const db = require("../../model");
class UserCheckEmailProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async checkEmail(email,session) {
      return this.execute(this.database,email,session);
    }

    async process(db,email,session) {
       let User = db.models.user;
       let u = await User.collection.findOne({email:email},{session});
       return u;
    }
}

module.exports = UserCheckEmailProcess;