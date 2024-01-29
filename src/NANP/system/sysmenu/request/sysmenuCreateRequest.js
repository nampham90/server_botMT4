const AbstractRequest = require("../../../../common/abstract/AbstractRequest");
const Joi = require('joi');
function ConditionDto(condition) {
    this.menuName = condition.menuName;
    this.code = condition.code;
    this.orderNum = condition.orderNum;
    this.menuType = condition.menuType;
    this.path = condition.path;
    this.visible = condition.visible;
    this.status = condition.visible;
    this.newLinkFlag = condition.newLinkFlag;
    this.icon = condition.icon;
    this.alIcon = condition.alIcon;
    this.fatherId = condition.fatherId;
}
class SysMenuCreateRequest extends AbstractRequest {
    constructor(req) {
        super(req)
        this.error = "";
        const validate = this.Validator(req.body);
        if(validate.error) {
            this.error = validate.error.details[0].message;
        } else {
            this.condition = new ConditionDto(req.body);
        }
    }

    Validator = (condition) => {
        condition.fatherId = condition.fatherId + "";
        const rule = Joi.object({
            menuName: Joi.string().max(50).required(),
            code: Joi.string().max(50).required(),
            orderNum: Joi.number().integer().required(),
            menuType: Joi.string().length(1).required(),
            visible: Joi.boolean(),
            path: Joi.string().max(100),
            status: Joi.boolean().required(),
            newLinkFlag: Joi.boolean(),
            icon: Joi.string().max(50),
            alIcon: Joi.allow(),
            fatherId: Joi.string().max(24)
        });
        return rule.validate(condition);
    }


}

module.exports = SysMenuCreateRequest;