const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {QueryTypes} = require('sequelize');
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
class LoginProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async login(req) {
        return this.execute(req);
    }

    async process(req) {
        const user = await this.checkEmail(req.email);
        if(user) {
            if(!user.lastLoginTime) {
                // error . tài hoản chưa xác thực
                return new ErrorCodeEnum(ErrorCode.SYS_ERR_LOGIN_FAIL_AUTH);
            }
            // check pass 
            if(await this.checkPass(user, req.password) === true) {
                return await this.getRoleMenu(user);
            } // danh nhap thanh con
            return new ErrorCodeEnum(ErrorCode.SYS_ERR_LOGIN_FAIL_PASSWORD); // password không đúng .
        }
        return new ErrorCodeEnum(ErrorCode.SYS_ERR_LOGIN_FAIL_EMAIL); // email chưa đăng ký
    }

    async checkEmail(email) {
        return await this.models.sys_user.findOne({where: {email: email}, include: [
            {model: this.models.sys_role},
            {model: this.models.sys_department}
        ]})
    }

    async checkPass(user, password) {
        return await bcrypt.compare(password, user.password);
    }

    async getRoleMenu(user) {
        const strSql = " SELECT DISTINCT m.code FROM user_role ur " +
                       " JOIN role_menu rm ON ur.sysRoleId= rm.sysRoleId " +
                       " JOIN sys_menus m ON rm.sysMenuId = m.id  " +
                       " WHERE ur.sysUserId = ?; ";
        const data =  await this.sequelize.query(strSql, {
            replacements: [user.id],
            type: QueryTypes.SELECT
        });
        let strCode = "";
        if(data.length > 0) {
            strCode = data.map(item => item.code).join(",");
        }
        const payload = {
            userId: user.id,
            rol: strCode,
            username: user.name,
            email: user.email
         };
        const token = await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 60*60*24});
        return token;
    }
}

module.exports = LoginProcess