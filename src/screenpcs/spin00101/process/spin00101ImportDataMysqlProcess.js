const AbstractProcess = require('../../../process/abstractProcess/AbstractMysqlPorcess');
const commonfun = require('../../../common/functionCommon');

class ImportDataMysql extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async import(req) {
      return this.execute(req);
    }

    async process(db, req) {
        const {listUser ,listMenu, listRole, listDepartment} = req;
        // let sql = 'INSERT INTO post (ID,TITLE) VALUES (?,?),(?,?);';
        // const values = [
        //     [3,"Bai 3"],
        //     [4,"Bai 4"]
        // ]
        // const flatValues = values.flat(); 
        // const [rows, fields ] = await db.execute(sql,flatValues);
        // let sql = "SELECT * FROM post";
        // let [res, field ] = await db.execute(sql);

        //const [rows, fields ] = await this.InsertListDepartment(db,listDepartment);
       // const [rows, fields ] = await this.InsertListMenu(db, listMenu);
       // const [rows, fields ] = await this.InsertListRole(db, listRole);
        
        const [rows, fields ] = await this.InsertUser(db,listUser);
        console.log(rows);
        return rows;
    }

    async InsertRoleUser(db, iduser, lstRole) {
        let sql = "INSERT INTO user_role (user_id, role_id) VALUES ";
        for(let i = 0; i < lstRole.length; i++) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?)`;
        }

        const values = lstRole.map(element=> [
            iduser.toString() ? iduser.toString() : "",
            element.toString() ? element.toString() : "",
        ])
        const flatValues = values.flat(); 

        const res = await db.execute(sql, flatValues);
        console.log(res);
        return res;

    }

    async InsertUser(db, listUser) {
        let i = 0;
        const now = commonfun.datePipe();
        let sql = "INSERT INTO sys_user (id,department_id,username,password,email,is_available,mobile,sex,avatar,education,last_login_time,create_time,update_time) VALUES ";
        for(let element of listUser) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.InsertRoleUser(db, element._id, element.role_id);
            i++;
        }
        const values = listUser.map(element=> [
            element._id ? element._id.toString() : "",
            element.phongban_id ? element.phongban_id : "",
            element.name ? element.name : "",
            element.password ? element.password : "",
            element.email ? element.email : "",
            element.available ? element.available : 0,
            element.dienthoai ? element.dienthoai : "",
            element.sex ? element.sex : 1,
            element.avatar ? element.avatar.toString() : "",
            0,
            now,
            now,
            now
        ])
        const flatValues = values.flat(); 
        const res = await db.execute(sql, flatValues);
        console.log(res);
        return res;
    }

    async InsertListMenu(db, listMenu) {
        const now = commonfun.datePipe();
        let sql = "INSERT INTO sys_permission (id,lang,menu_name,code,father_id,order_num,path,menu_type,visible,status,icon,al_icon,is_new_link,create_time,update_time) VALUES ";
        for(let i = 0; i < listMenu.length; i++) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        }
        const values = listMenu.map(element=> [
            element.id ? element.id : '',
            element.lang ? element.lang : '',
            element.menu_name ? element.menu_name : '',
            element.code ? element.code : '',
            element.father_id ? element.father_id : '',
            element.order_num ? element.order_num : 0,
            element.path ? element.path : '',
            element.menu_type ? element.menu_type : '',
            '0',
            '0',
            element.icon ? element.icon : '',
            element.alIcon ? element.al_icon : '',
            element.is_new_link ? element.is_new_link : '',
            now,
            now
        ])
        const flatValues = values.flat(); 
        const res = await db.execute(sql, flatValues);
        console.log(res);
        return res;
    }

    async InsertListRole(db, listRole) {
        let i = 0;
        let sql = "INSERT INTO sys_role (id,role_name,role_desc) VALUES ";
        for(let element of listRole) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?, ?)`;
            await this.InsertRolePermission(db, element._id, element.dacquyen);
            i++;
        }
        const values = listRole.map(element=> [
            element._id.toString() ? element._id.toString() : "",
            element.rolename ? element.rolename : "",
            element.mota ? element.mota : "",
        ])
        
        const flatValues = values.flat(); 

        const res = await db.execute(sql, flatValues);
        console.log(res);
        return res;
    }

    async InsertRolePermission(db, idrole, lstPermission) {
        let sql = "INSERT INTO role_permission (role_id, permission_id) VALUES ";
        for(let i = 0; i < lstPermission.length; i++) {
            if(i > 0) {
                sql += ',';
            }
            sql += `(?, ?)`;
        }

        const values = lstPermission.map(element=> [
            idrole.toString() ? idrole.toString() : "",
            element.toString() ? element.toString() : "",
        ])
        const flatValues = values.flat(); 

        const res = await db.execute(sql, flatValues);
        console.log(res);
        return res;

    }

    async InsertListDepartment(db,listDepartment) {
        const now = commonfun.datePipe();
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
            element.id ? element.id : "",
            element.tenphongban ? element.tenphongban : "",
            element.fatherId ? element.fatherId : "0",
            element.orderNum ? element.orderNum : 0,
            element.state ? element.state : 0,
            now,
            now
        ]);

        const flatValues = values.flat(); 

        const res = await db.execute(sql, flatValues);
        console.log(res);
        return res;
    }
}

module.exports = ImportDataMysql;