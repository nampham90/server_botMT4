

const AbstractProcess = require("../../../../common/abstract/AbstractProcess");

class Spot00101ListOrderProcess extends AbstractProcess {
    constructor() {
        super();
    }

    async getListOrder(req) {
        return this.execute(req);
    }

    async process(req) {
        const usercd = req.userID;
        let conditions = {};
        let result = {
            lstnewOd : [],
            lstQTESTS : [],
            lstORDSTS : [],
            lstORDAPPSTS: [],
            lstPAYSTS: [],
            lstSHIPSTS: []
        }
        conditions = {
            QTESTS : 0
        }
        result.lstnewOd = await this.getlstSTS(usercd, conditions);

        conditions = {
            QTESTS : 1,
            ORDSTS: 0
        }
        result.lstQTESTS = await this.getlstSTS(usercd, conditions);

        conditions = {
            ORDSTS: 1,
            ORDAPPSTS : 0
        }
        result.lstORDSTS = await this.getlstSTS(usercd, conditions);

        conditions = {
            ORDAPPSTS: 1,
            PAYSTS : 0
        }
        result.lstORDAPPSTS = await this.getlstSTS(usercd, conditions);

        conditions = {
            PAYSTS: 1,
            SHIPSTS : 0
        }
        result.lstPAYSTS = await this.getlstSTS(usercd, conditions);

        conditions = {
            SHIPSTS : 1
        }
        result.lstSHIPSTS = await this.getlstSTS(usercd, conditions);

        return result;
    }

    async getlstSTS(usercd, conditions) {
        const lstnewOd = await this.models.Tot010Sts.findAll({
            attributes: {
                include: [
                    [this.sequelize.literal(` CASE WHEN RSLTSENDFLG = 1 THEN 'Đã xuất hàng'
                        WHEN SHIPSTS = 1  THEN  'Dự định xuất kho'
                        WHEN PAYSTS = 1  THEN  'Thanh toán'
                        WHEN ORDAPPSTS = 1  THEN  'Duyệt đặt hàng'
                        WHEN ORDSTS = 1  THEN  'Đặt hàng'
                        WHEN QTESTS = 1  THEN  'Báo giá'
                        WHEN QTESTS = 0  THEN  'Khởi tạo'
                    END
                    `), 'STSNM']
                ]
            },
            where: conditions,
            include: [
                {
                    model: this.models.Tot020Ordhed,
                    include: [
                        {
                            model: this.models.sys_user,
                            as: 'customer', // sử dụng tên đã đặt cho quan hệ theo CSTMCD
                            attributes: ['name'] // chỉ lấy các trường cần thiết
                        },
                        {
                            model: this.models.Tot040Orddtl,
                            include: [
                                {
                                    model: this.models.Product
                                }
                            ]
                        }
                    ],
                    where: {
                        USERCD : usercd
                    }
                }
            ]
        });

        return lstnewOd;

    }
}

module.exports = Spot00101ListOrderProcess;