const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const moment = require('moment');

class Spin00101CreateProcess extends AbstractProcess {
    constructor() {
        super();
    }

    async create(req) {
        return this.execute(req);
    }

    async process(req) {
        const SIPLNNO = req.newID;
        const userCD = req.userID;
        const ngaynhap = req.body.ARVLPLNDATE;
        //start transaction
        const t = await this.sequelize.transaction();
        try {
            // insert tin010
            await this.insertTin010(SIPLNNO,t);
            // insert tin020
            await this.insertTin020(SIPLNNO,userCD, req, t);
            // insert tin040
            await this. insertTin040(SIPLNNO, userCD, req.body.tin040_plandtls, t);
            //end transaction
            await t.commit();
            return SIPLNNO;
        } catch (error) {
            console.log(error);
            await t.rollback();
            return "";
        }
    }

    // insertTin010 
    async insertTin010(SIPLNNO, t) {
        const newTin010 = await this.models.Tin010Sts.create({
            SIPLNNO: SIPLNNO,
            ARVLCOMPFLG: '1',
            SICOMPFLG: '0',
            RSLTSENDFLG: '0'
        }, { transaction: t});
        return newTin010;
    }

    // insert Tin020
    async insertTin020(SIPLNNO, userCD, req, t) {
        const { ARVLPLNDATE, SIREMARK, SPPLYCD, DIVKBN} = req.body;
        const newTin020 = await this.models.Tin020Planhed.create({
            SIPLNNO: SIPLNNO,
            ARVLPLNDATE:ARVLPLNDATE,
            SIREMARK: SIREMARK,
            tin010StSIPLNNO: SIPLNNO,
            SPPLYCD: SPPLYCD,
            USERCD: userCD,
            DIVKBN: DIVKBN,
            tmt280DivDIVKBN: DIVKBN
        }, {transaction: t});
        return newTin020;
    }

    // insert Tin040
    async insertTin040(SIPLNNO,userCD, list, t, ngaynhap) {
        let listTin040 = [];
        const ngayNhapHangMoment = moment(ngaynhap);
        const ngayNhapHangDate = ngayNhapHangMoment.toDate();

        for(let element of list) {
            let ngayHetHan = ngayNhapHangDate;

            if(element.GUARANTEQTY > 0) {
                ngayHetHan = ngayNhapHangMoment.clone().add(element.GUARANTEQTY, 'months');
            }
            let tin040 = {
                SIPLNNO: SIPLNNO,
                SODTLNO: element.SODTLNO,
                ARVLPLNQTY: element.ARVLPLNQTY,
                ARVLPLNREMAINQTY: element.ARVLPLNREMAINQTY,
                LIMITDATE: ngayHetHan,
                GUARANTEQTY: element.GUARANTEQTY,
                SIPRICE: element.SIPRICE,
                SIDTLREMARK: element.SIDTLREMARK,
                PRODUCTGRPCD: element.product.id + element.QTYCD + element.SIPRICE,
                tin020PlanhedSIPLNNO: SIPLNNO,
                PRODUCTCD: element.product.id,
                productId:element.product.id,
                QTYCD: element.QTYCD,
                tmt140QualityQTYCD: element.QTYCD
            }
            listTin040.push(tin040);
        }
        const insertList = await this.models.Tin040Plandtl.bulkCreate(listTin040, {transaction: t, primaryKeyAttributes: ['SIPLNNO', 'SODTLNO']});
        return insertList;
    }


}

module.exports = Spin00101CreateProcess;