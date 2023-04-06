const Transaction = require('../abstractProcess/Transaction');
const db = require("../../model");
class UserCheckEmailProcess extends Transaction {
    constructor(dbcon) {
        super(dbcon);
    }

    async checkEmail(email) {
      return this.execute(db,email);
    }

    async process(db,email) {
       let User = db.user;
       let u = await User.findOne({email:email});
       if(u) return true;
       return false;
    }
}

module.exports = UserCheckEmailProcess;