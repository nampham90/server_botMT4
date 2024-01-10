const AbstractProcess = require("../../../common/abstract/AbstractProcess");
const leftPad = require('pad-left');

class SequenceProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async getSequence(req) {
        return this.execute(req);
    }

    async process(req) {
        const prefix = req.prefix;
        const wkprefix = "IS";
        const t = await this.sequelize.transaction();
        try {
            if(prefix){
                // tìm trong bảng tcc030 xem có không
                const PreF = await this.models.TCC030SEQNO.findOne({
                    where: {
                        prefix: prefix
                    }
                }, {transaction: t});
                if(PreF) {
                    const {prefix,seqno,maxdigit} = PreF;
                    // Nếu có thì tạo sô Seqno
                    const sequence =  this.getSeqno(prefix,seqno,maxdigit);
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
                        prefix: prefix,
                        seqno: 2,
                        nokbnname: "",
                        maxdigit: 6
                    }, {transaction: t});
                    if(newPrefix) {
                        const sequence =  this.getSeqno(prefix,1,6);
                        await t.commit();
                        return sequence;
                    }else {
                        await t.rollback();
                        return null;
                    }
                }
            } else {
                // tạo số IS. // mã sản phẩm của của hàng
                // IS mặc định phải có trong db
                const PreF = await this.models.TCC030SEQNO.findOne({
                    where: {
                        prefix: wkprefix
                    }
                }, {transaction: t});

                if(PreF) {
                    const {prefix,seqno,maxdigit} = PreF;
                    const sequence =  this.getSeqno(prefix,seqno,maxdigit);
                    await this.models.TCC030SEQNO.update({
                        seqno: seqno + 1
                    }, {
                        where: {
                            prefix: wkprefix
                        }
                    }, {transaction: t});
                    await t.commit();
                    return sequence;
                } else {
                    await t.rollback();
                    return null;
                }
            }
        } catch (error) {
            await t.rollback();
        }
    }

    getSeqno(prefix,seqno, maxdigit) {
        let ms = Date.now();
        let date = new Date(ms);
        let dateString = date.toLocaleDateString('vi-VN', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        });
        dateString = dateString.slice(0, 2) + dateString.slice(3, 5) + dateString.slice(6);
        let randomNumberString = leftPad(seqno, maxdigit, '0');
        let result = prefix + dateString + randomNumberString;
        return result;
    }
}

module.exports = SequenceProcess;