const Transaction = require('../abstract/Transaction');
const bcrypt = require('bcryptjs');
const _ = require("lodash")
const db = require("../model");
let commonfun = require('../common/functionCommon');
let Responses = require('../common/response');
let Response = Responses.Response;
let DataResponse = Responses.DataResponse;
class UserProcess extends Transaction {

    constructor(dbcon) {
        super(dbcon);
      }
      async insertUser(data) {
        return this.execute(db,data);
      }

      async process(db,data) {
        let User = db.user
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
        await newUser.save();

        return 1;
      }
}

module.exports = UserProcess;