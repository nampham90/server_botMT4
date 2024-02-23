const AbstractProcess = require("../../../../common/abstract/AbstractProcess");


class Spot00101UpdateOrderProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async updateOrder(req) {
        return this.execute(req);
    }

    async process(req) {
        const soodno = req.order.SOODNO;
        const tot020 = req.order.tot020_ordhed;
        const litTot040 = tot020.tot040_orddtls;
        const t = await this.sequelize.transaction();
        try {
            // update delete tot040,
            await this.deleteTot040(soodno, t);
            // insert tot040
            await this.insertTot040(litTot040, t);
            // update tot020
           // await this.updateTot020(req.order, t);
            // update tot010
            await this.updateTot010(soodno, t);
            (await t).commit();
            return soodno;
        } catch (error) {
            console.log(error);
            (await t).rollback();
            return "";
        }
    }

    async deleteTot040(od, t){
        const deletes = await this.models.Tot040Orddtl.destroy({
             where: {SOODNO: od}
        }, {transaction: t})
        return deletes
    }

    async insertTot040(list, t) {
        const lstTot040 = this.mergerlistTot040(list);
        const createList = await this.models.Tot040Orddtl.bulkCreate(lstTot040, {transaction: t, primaryKeyAttributes: ['SOODNO', 'SODTLNO']});
        return createList;
    }

    mergerlistTot040(list) {
        let listTot040 = []
        for(let element of list) {
            let item = {
                SOODNO: element.SOODNO,
                SODTLNO: element.SODTLNO,
                SOPRICE: element.SOPRICE,
                SHIPMNTORDQTY: element.SHIPMNTORDQTY,
                SHIPMNTORDREMAINQTY: element.SHIPMNTORDREMAINQTY,
                SOREMARK: element.SOREMARK,
                tot020OrdhedSOODNO: element.SOODNO,
                PRODUCTCD: element.PRODUCTCD.id,
                productId: element.PRODUCTCD.id,
                QTYCD: element.QTYCD,
                tmt140QualityQTYCD: element.QTYCD
            }
            listTot040.push(item);
        }
        return listTot040;
    }

    async updateTot020(order, t) {
        const {SOODNO, CSTMCD, DELIMTHDCD, PAYMETHDCD, DELIPLNDATE, ORDERDATE, PAYOFDATE, SHIPDATE, SOPLNDATE, DEPOSIT, PACKQTY, INSTALLFEE, ODDISCONT,TAX,POSTPAIDFLG,SOREMARK ,USERCD} = order.tot020_ordhed;
        const affectedRows = await this.models.Tot020Ordhed.update({
            ORDERDATE: ORDERDATE,
            PAYOFDATE: PAYOFDATE,
            SHIPDATE: SHIPDATE,
            SOPLNDATE: SOPLNDATE,
            DELIPLNDATE: DELIPLNDATE,
            DEPOSIT: DEPOSIT,
            ODDISCONT: ODDISCONT,
            INSTALLFEE: INSTALLFEE,
            TAX: TAX,
            POSTPAIDFLG: POSTPAIDFLG,
            SOREMARK: SOREMARK,
            PACKQTY: PACKQTY,
            DELIMTHDCD: DELIMTHDCD,
            tmt170DelimthdDELIMTHCD:DELIMTHDCD,
            PAYMETHDCD: PAYMETHDCD,
            tmt171PaymethdPAYMETHDCD: PAYMETHDCD,
            USERCD: USERCD,
            CSTMCD: CSTMCD
        }, {where : {SOODNO: SOODNO}}, {transaction: t});
        return affectedRows[0];

    }

    async updateTot010(od, t) {
        const affectedRows = await this.models.Tot010Sts.update({
            QTESTS: true
        },{where: {SOODNO: od}}, {transaction: t});
        return affectedRows[0];

    }
}

module.exports = Spot00101UpdateOrderProcess;