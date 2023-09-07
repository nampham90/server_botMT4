const AbstractProcess = require('../abstractProcess/AbstractProcess');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const GhiNhatkyHethongProcess = require("../nhatkyhethongProcess/ghiNhatkyHethongProcess");
class UserChangePasswordProcess extends AbstractProcess {
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
                // ghi nhatk kys he thong
                let ghiNhatkyHethongProcess = new GhiNhatkyHethongProcess(this.database);
                let datank = {
                    loaithongbao: 'system', //Thông báo chung, thông báo hệ thống, thông báo về kế hoạch sắp tới notifi | system | vison
                    noidung: 'Thay đổi mật khẩu',
                    iduser: ObjectId(data.id), // ID User
                    hanhdong: "updateOne", // update || delete || create
                    table: 'user', //tên table thay đổi
                    ngay: new Date(), // thời gian thực hiện hàn động đó. _now
                    status01: 'UserChangePasswordProcess', // process thực hiên
                    status02: '', // 
                    status03: '',
                    status04: '',
                    status05: ''
                }
                await ghiNhatkyHethongProcess.ghinhatkyhethong(datank,session)
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