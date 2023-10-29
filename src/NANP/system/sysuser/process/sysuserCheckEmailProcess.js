const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysUserCheckEmailProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async checkEmail(req) {
        return this.execute(req);
    }

    async process(req) {
        const user = await this.models.sys_user.findOne({where: {email: req.email}});
        if(user) return true;
        return false;
    }
}

module.exports = SysUserCheckEmailProcess;