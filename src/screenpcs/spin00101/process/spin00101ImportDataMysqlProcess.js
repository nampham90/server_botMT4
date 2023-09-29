const AbstractProcess = require('../../../process/abstractProcess/AbstractMysqlPorcess');
const commonfun = require('../../../common/functionCommon');

class ImportDataMysql extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async import(req) {
      return this.execute(this.connection,req);
    }

    async process(db, req) {
        const {listUser ,listMenu, listRole, listDepartment} = req;
        await this.InsertListDepartment(db,listDepartment);
        await this.InsertListRole(db, listRole);
        await this.InsertListMenu(db, listMenu);
        await this.InsertUser(db,listUser);
    }

    async InsertUser(db, listUser) {
        let sql = "INSERT INTO sys_user (id,department_id,username,password,email,is_available,mobile,sex,avatar,education,last_login_time,create_time,update_time) VALUES ";
        for(let i = 0; i <= listUser.length; i++) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            i++;
        }
        const values = listUser.map(element=> [
            element.id ? element.id : null,
            element.phongban_id ? element.phongban_id : null,
            element.name ? element.name : null,
            element.password ? element.password : null,
            element.email ? element.email : null,
            element.available ? element.available : null,
            element.dienthoai ? element.dienthoai : null,
            element.sex ? element.sex : null,
            element.zalo ? element.zalo : null,
            element.avatar ? element.avatar : null,
            commonfun.datePipe,
            commonfun.datePipe,
            commonfun.datePipe
        ])
        const flatValues = values.flat(); 
        await db.execute(sql, flatValues);
    }

    async InsertListMenu(db, listMenu) {
        let sql = "INSERT INTO sys_permission (id,lang,menu_name,code,father_id,order_num,path,menu_type,visible,status,icon,al_icon,is_new_link,create_time,update_time) VALUES ";
        for(let i = 0; i <= listMenu.length; i++) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            i++;
        }
        const values = listRole.map(element=> [
            element.id ? element.id : null,
            element.lang ? element.lang : null,
            element.menuName ? element.menuName : null,
            element.code ? element.code : null,
            element.fatherId ? element.fatherId : null,
            element.orderNum ? element.orderNum : null,
            element.path ? element.path : null,
            element.menuType ? element.menuType : null,
            element.visible ? element.visible : null,
            element.status ? element.status : null,
            element.icon ? element.icon : null,
            element.alIcon ? element.alIcon : null,
            element.newLinkFlag ? element.newLinkFlag : null,
            commonfun.datePipe,
            commonfun.datePipe
        ])
        const flatValues = values.flat(); 
        await db.execute(sql, flatValues);
    }

    async InsertListRole(db, listRole) {
        let i = 0;
        let sql = "INSERT INTO sys_role (id,role_name,role_desc) VALUES ";
        for(let element of listDepartment) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?, ?)`;
            await InsertRolePermission(db, element.id, element.dacquyen);
            i++;
        }
        const values = listRole.map(element=> [
            element.id ? element.id : null,
            element.rolename ? element.rolename : null,
            element.mota ? element.mota : null,
        ])
        
        const flatValues = values.flat(); 

        await db.execute(sql, flatValues);

    }

    async InsertRolePermission(db, idrole, lstPermission) {
       // let i = 0;
        let sql = "INSERT INTO role_permission (role_id, permission_id) VALUES ";
        for(let i = 0; i <= lstPermission.length; i++) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?)`;
            i++;
        }

        const values = lstPermission.map(element=> [
            idrole ? idrole : null,
            element ? element : null,
        ])
        const flatValues = values.flat(); 

        await db.execute(sql, flatValues);

    }

    async InsertListDepartment(db,listDepartment) {
        let i = 0;
        let sql = "INSERT INTO sys_department (id,department_name,father_id,order_num,state,create_time,update_time) VALUES ";
        for(let element of listDepartment) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?, ?, ?, ?, ?, ?)`;
            i++;
        }

        const values = listDepartment.map(element => [
            element.id ? element.id : null,
            element.tenphongban ? element.tenphongban : null,
            element.fatherId ? element.fatherId : null,
            element.orderNum ? element.orderNum : null,
            element.state ? element.state : null,
            commonfun.datePipe,
            commonfun.datePipe
        ]);

        const flatValues = values.flat(); 

        await db.execute(sql, flatValues,);
    }
}

module.exports = ImportDataMysql;