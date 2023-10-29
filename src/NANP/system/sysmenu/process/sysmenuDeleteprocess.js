const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { ErrorCodeEnum, ErrorCode } = require("../../../../common/enums/ErrorCode");
const { QueryTypes } = require('sequelize');

class SysMenuDeleteProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async delete(req) {
        return this.execute(req);
    }

    async process(req) {
        const deletes = await this.models.sys_menu.destroy({where: {id: req.condition.ids, lang: req.lang}});
        return deletes[0];
    }
}

module.exports = SysMenuDeleteProcess;