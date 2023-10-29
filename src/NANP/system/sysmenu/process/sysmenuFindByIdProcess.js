const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysMenuFindByIdProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findById(req) {
        return this.execute(req);
    }

    async process(req) {

        const menu = await this.models.sys_menu.findOne({where: {id : req.condition.id ,lang: req.lang}});
        if(!menu) return new ErrorCodeEnum(ErrorCode.SYS_ERR_ACCOUNT_NULL);
        return menu
    }
}

module.exports = SysMenuFindByIdProcess;