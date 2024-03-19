const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { Op } = require('sequelize');
const PageInfo = require("../../../../common/pageInfo/pageInfo");
const moment = require('moment');
class Spin00201FindConditionProcess extends AbstractProcess {
    constructor() {
        super();
    }

    async findConditon(req) {
        return this.execute(req);
    }

    async process(req) {
        const fromDate = req.condition.fromDate;
        const toDate = req.condition.toDate;
        const condition = req.condition;
        if(fromDate && toDate) {
            delete condition.fromDate;
            delete condition.toDate;
            condition.ARVLPLNDATE = {
                [Op.between]: [moment(fromDate).startOf('day').toDate(), moment(toDate).endOf('day').toDate()]
            }
        } else if (fromDate){
            delete condition.fromDate;
            condition.ARVLPLNDATE = {
                [Op.gte]: moment(fromDate).startOf('day').toDate()
            }
        } else if(toDate) {
            condition.ARVLPLNDATE = {
                [Op.lte]: moment(toDate).endOf('day').toDate()
            }
        }
        const conditionSTS = req.conditionSTS;
        const {rows, count} = await this.models.Tin020Planhed.findAndCountAll({
            attributes: {
                include: [
                    [this.sequelize.literal(`
                          CASE WHEN RSLTSENDFLG = 1 THEN 'Đã nhập hàng'
                               WHEN SICOMPFLG = 1  THEN  'Hoàn thành nhập hàng'
                               WHEN ARVLCOMPFLG = 1  THEN  'Đăng ký'
                          END
                    `), 'STSNM']
                ]
            },
            include: [
                {model: this.models.Tin010Sts, where: conditionSTS},
                {model: this.models.Tin040Plandtl},
                {model: this.models.sys_user, as : 'supplier',attributes: ['id','name']},
                {model: this.models.sys_user, as : 'employe',attributes: ['id','name']},
            ],
            where : condition,
            group: ['SIPLNNO'],
            order: [['ARVLPLNDATE', 'DESC']],
            limit: req.pageSize, 
            offset: req.pageSize*( req.pageNum - 1),
        });
        return new PageInfo(count.length, rows, req.pageNum, req.pageSize);
    }


}

module.exports = Spin00201FindConditionProcess;