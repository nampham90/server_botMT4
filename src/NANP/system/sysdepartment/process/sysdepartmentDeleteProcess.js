const AbstractProcess = require("../../../../common/abstract/AbstractProcess");


class SysDepartmentDeleteProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async delete(req) {
        return this.execute(req);
    }

    async process(req) {
        const deletes = await this.models.sys_department.destroy({
            where: {
                id: req.id,
                lang: req.lang
            }
        })
        return deletes;
    }
}

module.exports = SysDepartmentDeleteProcess;