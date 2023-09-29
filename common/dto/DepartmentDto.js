class DepartmentDto {
    constructor(DepartmentEntity) {
        this.id = DepartmentEntity.id;
        this.department_name = DepartmentEntity.department_name;
        this.father_id = DepartmentEntity.father_id;
        this.order_num = DepartmentEntity.order_num;
        this.state = DepartmentEntity.state;
        this.create_time = DepartmentEntity.create_time;
        this.update_time = DepartmentEntity.update_time;
    }
}

module.exports = DepartmentDto;