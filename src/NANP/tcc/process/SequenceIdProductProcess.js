const AbstractProcess = require("../../../common/abstract/AbstractProcess");

const leftPad = require('pad-left');
class SequenceIdProductProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async getSequenceIdProduct(req) {
        return this.execute(req);
    }

    async process(req) {
        const catId = req.catid;
        let wkprefix = "";
        let sequence = "";
        const t = await this.sequelize.transaction();
        try {
            //get wkprefix from catId
            const Cat = await this.models.ProductCategory.findOne({
                where: {id: catId}
            }, {transaction: t});
            if(Cat) {
                wkprefix = Cat.catid;
                // tìm trong bảng tcc030 xem có  wkprefix không
                const PreF = await this.models.TCC030SEQNO.findOne({
                    where: {
                        prefix: wkprefix
                    }
                }, {transaction: t});
                if(PreF) {
                    const {prefix,seqno,maxdigit} = PreF;
                    sequence =  this.getSeqno(prefix,seqno,maxdigit);
                    // update lại sô seqno
                    await this.models.TCC030SEQNO.update({
                        seqno: seqno + 1
                    }, {
                        where: {
                            prefix: prefix
                        }
                    }, {transaction: t});
                    await t.commit();
                    return sequence;
                } else {
                    // Nếu không có thì tạo mơi prefix
                    const newPrefix = await this.models.TCC030SEQNO.create({
                        prefix: wkprefix,
                        seqno: 2,
                        nokbnname: "",
                        maxdigit: 3
                    }, {transaction: t});
                    if(newPrefix) {
                        sequence =  this.getSeqno(wkprefix,1,3);
                        await t.commit();
                        return sequence;
                    }else {
                        await t.rollback();
                        return null;
                    }
                }
            } else {
                return null;
            }
        } catch (error) {
            console.log(error.message);
            await t.rollback();
        }
    }

    getSeqno(prefix,seqno, maxdigit) {
        let randomNumberString = leftPad(seqno, maxdigit, '0');
        let result = prefix + randomNumberString;
        return result;
    }
}

module.exports = SequenceIdProductProcess;