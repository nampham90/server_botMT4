const AbstractProcess = require("../../../../common/abstract/AbstractProcess");


class Spmt00101RegistProductProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async regist(req) {
        return this.execute(req)
    }

    async process(req) {
        const {category_id,product_name,seqno} = req.dataRegist;
        const regist = await this.models.Product.create({
            id: seqno,
            lang: req.lang,
            product_name: product_name,
            description: '',
            price: 0,
            stock: 0,
            is_composite: false,
            image: "",
            category_id: category_id,
            productCategoryId: category_id
        });
        return regist;
    }
}

module.exports = Spmt00101RegistProductProcess;