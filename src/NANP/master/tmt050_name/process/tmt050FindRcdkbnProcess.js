const AbstractProcess = require("../../../../common/abstract/AbstractProcess");


class Tmt050FindRcdkbnProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async findByRcdkbn(req) {
        return this.execute(req);
    }

    async process(req) {
        const {rcdkbn} = req;
        const lstdata = await this.models.Tmt050Name.findAll({
            where: {
                RCDKBN: rcdkbn
            }
        });
        return lstdata;
    }
}

module.exports = Tmt050FindRcdkbnProcess;