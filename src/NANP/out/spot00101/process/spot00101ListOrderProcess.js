
const AbstractProcess = require("../../../../common/abstract/AbstractProcess");

class Spot00101ListOrderProcess extends AbstractProcess {
    constructor() {
        super();
    }

    async getListOrder(req) {
        return this.execute(req);
    }

    async process(req) {
        let result = {
            lstnewOd : [],
            lstQTESTS : [],
            lstORDSTS : [],
            lstORDAPPSTS: [],
            lstPAYSTS: [],
            lstSHIPSTS: []
        }
        result.lstnewOd = await this.getlstnewOd();

        return result;
    }

    async getlstnewOd() {
        const lstnewOd = await this.models.Tot010Sts.findAll({
            where: { QTESTS : 0},
            include: [
                {
                    model: this.models.Tot020Ordhed,
                    include: [
                        {
                            model: this.models.Tot040Orddtl
                        }
                    ]
                }
            ]
        });

        return lstnewOd;

    }
}

module.exports = Spot00101ListOrderProcess;