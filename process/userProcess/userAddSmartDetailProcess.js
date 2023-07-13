const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const _ = require("lodash")
const Const = require('../../common/const');
class UserAddSmartDetailProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async addSmartDetail(data,session) {
        return this.execute(this.database,data,session);
    }
    
    async process(db, data, session) {
        const USER = db.models.user;
        let dataNow = _.now()
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        let newUser = new USER({
            makhachhang: data.makhachhang,
            name: data.name,
            available: true,
            sex: 1,
            email: data.email,
            dienthoai: data.dienthoai,
            zalo: data.dienthoai,
            password:hashPassword,
            role_id: [ObjectId(Const.role_iduser)],
            account_id: [],
            menulist: [],
            phongban_id: ObjectId(data.phongban_id),
            lastLoginTime:dataNow
        });
        let rs = await USER.collection.insertOne(newUser, { session });
        return rs;
    }
}

module.exports = UserAddSmartDetailProcess