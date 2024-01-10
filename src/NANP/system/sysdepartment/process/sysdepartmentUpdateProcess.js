const AbstractProcess = require("../../../../common/abstract/AbstractProcess");

class SysDepartmentUpdateProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async update(req) {
        return this.execute(req);
    }

    async process(req) {
        const {id, state, tenphongban} = req.dataUpdate;

        const dept = await this.models.sys_department.findOne({
            where: {
                id: id,
                lang: req.lang
            }
        });
        if(dept) {
            const affectedRows = await this.models.sys_department.update({
                tenphongban: tenphongban,
                state: state
            }, {
                where : {
                    id: id,
                    lang: req.lang
                }
            })
            return affectedRows[0];
        }
        return null;


    }
}

module.exports = SysDepartmentUpdateProcess;
