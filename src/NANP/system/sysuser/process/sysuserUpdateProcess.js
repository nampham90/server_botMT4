const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const bcrypt = require('bcryptjs');

class SysUserUpdateProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async update(req) {
        return this.execute(req);
    }

    async process(req) {
        const {id, name, available, sex, email, dienthoai, roles, phongban_id} = req;

        const u = await this.models.sys_user.findByPk(id);
        if(u) {
            const affectedRows = await this.models.sys_user.update({
                name: name,
                available: available,
                sex: sex,
                email: email,
                dienthoai:dienthoai,
                phongban_id: phongban_id
            }, {where: {id:id }})
    
            if(affectedRows[0] ===1 ) {
                await Promise.all([ this.userAddRole(u, roles),this.userJoinDepartment(u, phongban_id)]);
                return u;
            }
            return null;
        }
        return null
    }

    async userAddRole(user, roleIds) {
        let lstRole = []
        for(let roleId of roleIds) {
            const Role = await this.models.sys_role.findByPk(roleId);
            if(Role) lstRole.push(Role);
        }
        if(lstRole.length > 0) await user.setSys_roles(lstRole);
    }

    async userJoinDepartment(user, phongban_id) {
        const Department = await this.models.sys_department.findByPk(phongban_id);
        if(Department) await user.setSys_department(Department);
    }
}

module.exports = SysUserUpdateProcess