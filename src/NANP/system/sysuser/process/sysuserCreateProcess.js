const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const bcrypt = require('bcryptjs');

class SysUserCreateProcess extends AbstractProcess {
    constructor() {
        super()
    }

    async create(req) {
        return this.execute(req);
    }

    async process(req) {
        const {name, available, password, sex, email, dienthoai, roles,phongban_id} = req;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const u = await this.models.sys_user.create({
            name: name,
            password: hashPassword,
            available: available,
            sex: sex,
            email: email,
            dienthoai:dienthoai,
            phongban_id: phongban_id
        })
        if(u) {
            await Promise.all([ this.userAddRole(u, roles),this.userJoinDepartment(u, phongban_id)]);
            return u;
        }
        return null;
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

module.exports = SysUserCreateProcess