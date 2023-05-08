const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
class UserChangePasswordProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async changePassword(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const USER = db.models.user;
        let checkPass = await this.checkoldPassword(db,data,session);
        if(checkPass['msgId'] == "") {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(data.newPassword, salt);
            // pudate mâtkhau
            let result =  await USER.collection.updateOne(
                {_id: ObjectId(data.id)},
                {$set:{
                   password: hashPassword,
                }},
                {session}
            );

            if(result.modifiedCount > 0 ) {
                return checkPass;
            } else {
                let response = {
                    "msgId": "MSG03",
                    "msgError": "Update không thành công !"
                }
                return response;
            }
        } else {
            return checkPass;
        }
       
    }

    async checkoldPassword(db,data,session) {
        let response = {
            "msgId": "",
            "msgError": ""
        }
        const USER = db.models.user;
        let u = await USER.collection.findOne({_id:ObjectId(data.id)},{session});
        if(u) {
            const checkPassword = await bcrypt.compare(data.oldPassword, u.password);
            if (!checkPassword){
               response.msgId = "MSG01"
               response.msgError = "Mật khẩu củ không đúng !";
               return response
            } else {
               return response
            }
        } else {
            response.msgId = "MSG02"
            response.msgError = "Tại khoản của bạn không tồn tại !";
            return response
        }

    }
}

module.exports = UserChangePasswordProcess;