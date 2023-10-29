const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(menuId) {
    this.id = menuId;
}
class SysMenuFindByIdRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        if(req.body.menuId) {
            const validate = this.Validator(req.body.menuId);
            if(validate.error) {
                this.error = validate.error.details[0].message;
            } else {
                this.condition = new ConditionDto(req.body.menuId);
            }
        } 
       
    }

    Validator = (id) => {
        const rule = Joi.string().length(24).required()
        return rule.validate(id);
    }


}

module.exports = SysMenuFindByIdRequest;