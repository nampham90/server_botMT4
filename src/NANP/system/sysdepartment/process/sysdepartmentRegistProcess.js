const AbstractProcess = require("../../../../common/abstract/AbstractProcess");

class SysDepartmentRegistProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async regist(req) {
        return this.execute(req);
    }

    async process(req) {
        const { tenphongban, fatherId, state,  orderNum} = req.dataRegist;

        const dept = await this.models.sys_department.create({
            lang: req.lang,
            tenphongban: tenphongban,
            fatherId: fatherId,
            state: state,
            orderNum: orderNum
        });
        if(dept) return dept;
        return null;
    }
}

module.exports = SysDepartmentRegistProcess;