
const AbstractProcess = require("../../../../common/abstract/AbstractProcess");


class Spin00101FindOnePlanProcess extends AbstractProcess {
    constructor(){
        super();
    }

    async findOne(req) {
        return this.execute(req);
    }

    async process(req) {
        const siplnno = req.siplnno;

        const result = await this.models.Tin020Planhed.findOne({
            attributes: {
                include: [
                    [this.sequelize.literal(`
                          CASE WHEN RSLTSENDFLG = 1 THEN 'Đã nhập hàng'
                               WHEN SICOMPFLG = 1  THEN  'Hoàn thành nhập hàng'
                               WHEN ARVLCOMPFLG = 1  THEN  'Khởi tạo'
                          END
                    `), 'STSNM']
                ]
            },
            where : {SIPLNNO: siplnno},
            include: [
                {model: this.models.Tin010Sts},
                {model: this.models.Tin040Plandtl},
            ]
        })
        return result
    }
}

module.exports = Spin00101FindOnePlanProcess;