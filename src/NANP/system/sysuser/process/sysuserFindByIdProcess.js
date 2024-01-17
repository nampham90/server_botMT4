const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysUserFindByIdProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findById(req) {
        return this.execute(req);
    }

    async process(req) {
        // const users = await this.sequelize.query("SELECT * FROM sys_users where id = ?", {
        //     replacements: [req.id],
        //     type: QueryTypes.SELECT
        // })
        const user = await this.models.sys_user.findOne({
                    where: {id : parseInt(req.id)},
                    include: {
                        model:this.models.sys_role
                    }});
        if(!user) return new ErrorCodeEnum(ErrorCode.SYS_ERR_ACCOUNT_NULL);
        return user
    }
}

module.exports = SysUserFindByIdProcess;