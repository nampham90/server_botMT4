const AbstractProcess = require('../abstractProcess/AbstractProcess');
const bcrypt = require('bcryptjs');
const _ = require("lodash");
const sendgrid = require("../../common/sendEmail");
//const db = require("../../model");
class UserRegisterProcess extends AbstractProcess {

    constructor(dbcon) {
        super(dbcon);
    }

    async insertUser(data,session) {
      return this.execute(this.database,data,session);
    }
    
    async process(db,data,session) {
      let res = 1;
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
          lastLoginTime:null
      });
      let rs = await User.collection.insertOne(newUser, { session });
      if(rs.insertedId){
        //gui email xac thuc

       const id = rs.insertedId+"";
       sendgrid.sendEmail(data.email,id);
      }
      return res;
    }
}

module.exports = UserRegisterProcess;