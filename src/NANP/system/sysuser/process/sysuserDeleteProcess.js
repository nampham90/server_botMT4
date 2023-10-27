const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysUserDeleteProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async delete(req) {
        return this.execute(req);
    }

    async process(req) {
        const deletes = await this.models.sys_user.destroy({where: {id: req.ids}});
        return deletes[0];
    }
}

module.exports = SysUserDeleteProcess;