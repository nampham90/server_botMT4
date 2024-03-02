const AbstractProcess = require("../../../common/abstract/AbstractProcess");
const PageInfo = require('../../../common/pageInfo/pageInfo');
class FindAllProductConditionProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async findAllProductCondition(req) {
        return this.execute(req);
    }

    async process(req) {
        const dynamicCondition = req.conditions.CATCD ? { category_id: req.conditions.CATCD } : {};
        delete req.conditions.CATCD;
        if(!req.conditions.QTYCD) delete req.conditions.QTYCD;
        if(!req.conditions.SUPPLYCD) delete req.conditions.SUPPLYCD;
        if(!req.conditions.MANUFACTTURECD) delete req.conditions.MANUFACTTURECD;
        const {rows, count} = await this.models.Tst010Stck.findAndCountAll({
            attributes: [
                [this.sequelize.literal('CONCAT(PRODUCTCD,QTYCD,PURPIRCE)'), 'PRODUCTCD'],
                [this.sequelize.literal('SUM(ALLWQTY)'), 'TOTALALLWQTY'],
                'PURPIRCE',
                'TECHNICALPRICE',
                'SELLPIRCE',
                'LIMITDATE',
                'QTYCD',
                [this.sequelize.literal('(SELECT IFNULL(SUM(TOT040.SHIPMNTORDQTY), 0) FROM tot040_orddtls TOT040 LEFT JOIN tot010_sts TOT010 ON TOT040.SOODNO = TOT010.SOODNO WHERE PRODUCTCD = TOT040.PRODUCTCD AND QTYCD = TOT040.QTYCD AND TOT010.ORDSTS = 1)'), 'TOTALSHIPQTY'],
                'IMAGE',
            ],
            include: [
                {
                    model: this.models.Product,
                    include: [
                        {
                            model: this.models.ProductCategory,
                            attributes: ['name']
                        }
                    ],
                    where: dynamicCondition
                }
            ],
            where: {
                STATUS: 0,
                ...req.conditions, // Thêm điều kiện tìm kiếm nếu có
            },
            group: ['PRODUCTCD', 'QTYCD', 'PURPIRCE'],
            limit: req.pageSize, 
            offset: req.pageSize*( req.pageNum - 1)
        });

        return new PageInfo(count.length, rows, req.pageNum, req.pageSize);

    }
}

module.exports = FindAllProductConditionProcess