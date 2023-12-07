class RoleDto {
    constructor(RoleEntity) {
        this.id = RoleEntity.id;
        this.role_name = RoleEntity.role_name;
        this.role_desc = RoleEntity.role_desc;
    }
}

module.exports = RoleDto;