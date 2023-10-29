const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysUserCheckNameProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async checkName(req) {
        return this.execute(req);
    }

    async process(req) {
         const user = await this.models.sys_user.findOne({where: {name: req.name}});
         if(user) return true;
         return false;
    }
}

module.exports = SysUserCheckNameProcess;