const AbstractProcess = require("../../../../common/abstract/AbstractProcess");


class Spot00101NewOrderProcess extends AbstractProcess {
    constructor() {
        super();
    }

    async newOrder(req) {
        return this.execute(req);
    }

    async process(req) {
        const newOD = req.newOD;
        const userCD = req.userID;
        const t = await this.sequelize.transaction();
        try {
            // insert bảng tot010
            await this.insertTot010(newOD, t);
            // insert bảng tot020_header
            await this.insertTot020(userCD, newOD, t);
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            return false;
        }
    }

    async insertTot010(newOD, t) {
        const newOrder = await this.models.Tot010Sts.create({
            SOODNO: newOD,
            QTESTS: false,
            ORDSTS: false,
            ORDAPPSTS: false,
            PAYSTS: false,
            SHIPSTS: false,
            RSLTSENDFLG: false,
            SOCNCLORDFLG: false,
            SOCNCLCOMPFLG: false,
            EXCHANGEFLG: false,
            EXCHANGECOMPFLG: false
        }, {transaction: t});
        return newOrder
    }

    async insertTot020(userCD,newOD, t) {
        const newTot020 = await this.models.Tot020Ordhed.create({
            SOODNO: newOD,
            ORDERDATE: null,
            PAYOFDATE: null,
            SHIPDATE: null,
            SOPLNDATE: null,
            DELIPLNDATE: null,
            DEPOSIT: 0,
            ODDISCONT:0,
            INSTALLFEE:0,
            TAX: 0,
            POSTPAIDFLG: false,
            SOREMARK: "",
            PACKQTY: 0,
            tot010StSOODNO: newOD,
            DELIMTHDCD: null,
            tmt170DelimthdDELIMTHCD: null,
            PAYMETHDCD: null,
            tmt171PaymethdPAYMETHDCD: null,
            USERCD: userCD,
            sysUserId: null,
            CSTMCD: null
        }, {transaction: t});
        return newTot020;
    }
}

module.exports = Spot00101NewOrderProcess;