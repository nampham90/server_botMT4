const AbstractProcess = require("../../../../common/abstract/AbstractProcess");

class SysDepartmentFindByIdProcess extends AbstractProcess {
    constructor(){
        super()
    }


    async findById(req) {
        return this.execute(req);
    }


    async process(req) {
        const dept = await this.models.sys_department.findOne({
            where: {
                id: req.id,
                lang:req.lang
            }
        })
        if(dept) return dept;
        return null;
    }
}

module.exports = SysDepartmentFindByIdProcess;