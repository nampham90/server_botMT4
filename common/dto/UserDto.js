const DepartmentDto = require("./DepartmentDto")
class UserDto {

    constructor(UserEntity){
        this.id = UserEntity.id;
        this.create_time = UserEntity.create_time;
        this.education = UserEntity.education;
        this.email = UserEntity.email;
        this.is_visible = UserEntity.is_visible;
        this.last_login_time = UserEntity.last_login_time;
        this.mobile = UserEntity.mobile;
        this.password = UserEntity.password;
        this.sex = UserEntity.sex;
        this.telephone = UserEntity.telephone;
        this.update_time = UserEntity.update_time;
        this.department = new DepartmentDto(UserEntity.department);
    }
}

module.exports = UserDto