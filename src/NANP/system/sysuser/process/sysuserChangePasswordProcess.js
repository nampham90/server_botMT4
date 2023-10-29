const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
class SysUserChangePasswordProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async changePassword(req) {
        return this.execute(req);
    }

    async process(req) {
        const user = await this.models.sys_user.findByPk(req.userId);
        if(user) {
            const checkOldPass = await bcrypt.compare(req.condition.oldPassword, user.password);
            if(checkOldPass) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.condition.newPassword, salt);
                const updatePass = await this.models.sys_user.update({password: hashPassword}, {where: {id: req.userId}});
                return updatePass[0];
            }
            return new ErrorCodeEnum(ErrorCode.SYS_ERR_PASSWORD_ERROR)
        }
        return new ErrorCodeEnum(ErrorCode.SYS_ERR_ACCOUNT_NULL)
    }
}

module.exports = SysUserChangePasswordProcess;