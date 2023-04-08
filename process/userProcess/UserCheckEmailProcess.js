const Transaction = require('../abstractProcess/Transaction');
const db = require("../../model");
class UserCheckEmailProcess extends Transaction {
    constructor(dbcon) {
        super(dbcon);
    }

    async checkEmail(email,session) {
      return this.execute(this.database,email,session);
    }

    async process(db,email,session) {
       let User = db.models.user;
       let u = await User.collection.findOne({email:email},{session});
       if(u) return "0";
       return "1";
    }
}

module.exports = UserCheckEmailProcess;