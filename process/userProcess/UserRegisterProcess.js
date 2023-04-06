const Transaction = require('../abstractProcess/Transaction');
const bcrypt = require('bcryptjs');
const _ = require("lodash")
const db = require("../../model");
class UserRegisterProcess extends Transaction {

    constructor(dbcon) {
        super(dbcon);
    }

    async insertUser(data) {
      return this.execute(this.database,data);
    }
    
    async process(db,data) {
      let User = db.models.user
      let dataNow = _.now()
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(data.password, salt);
      let newUser = new User({
          name: data.name,
          available: data.available,
          sex: data.sex,
          email: data.email,
          dienthoai: data.dienthoai,
          zalo: data.zalo,
          password:hashPassword,
          role_id: data.role_id,
          account_id: [],
          menulist: [],
          phongban_id: data.phongban_id,
          lastLoginTime:dataNow
      });
      let res = await newUser.save();
      let newUser2 = new User({
        name: "",
        available: data.available,
        sex: data.sex,
        email: data.email,
        dienthoai: data.dienthoai,
        zalo: data.zalo,
        password:hashPassword,
        role_id: data.role_id,
        account_id: [],
        menulist: [],
        phongban_id: data.phongban_id,
        lastLoginTime:dataNow
      });
      await newUser2.save();
      return res;
    }
}

module.exports = UserRegisterProcess;