const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const dbMongo = require('../../../../model')
const { QueryTypes } = require('sequelize');
const MenuMongo = dbMongo.menu;
const UserMongo = dbMongo.user;
const RoleMongo = dbMongo.role;
const PhongbanMongo = dbMongo.phongban
const Tmt010Mongo = dbMongo.tmt010_file;
const Sc = dbMongo.screenpc;


class SysMenuFindAllProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async findAll(req) {
        return this.execute(req);
    }

    async addRoleDQ(lst) {
        lst.forEach( async (item) => {
            const role = await this.models.sys_role.findOne({where: {rolename: item.rolename}});
            if(role) {
                let listmenus = [];
                item.dacquyen.forEach(async (menu) => {
                     const m = await this.models.sys_menu.findOne({where: {id: menu._id.toString()}});
                     listmenus.push(m);
                })
                await role.setSys_menus(listmenus);
            }
        })
    }

    async process(req) {
        let lstusercover = [];
        let lstphongbancover = [];
        let lstrolecover = [];
        const lstMenuMongo = await MenuMongo.find({});
        const lstUserMongo = await UserMongo.find({});
        const lstPhongbanMongo = await PhongbanMongo.find({});
        const lsSc = await Sc.find({});
        let lstdataInsert = [];
        // for(let element of lsSc) {
        //     let scone = {
        //         lang: element.lang,
        //         title1: element.title1,
        //         title2: element.title2,
        //         vitri: element.vitri,
        //         status: element.status,
        //         menu_id: element.idmenu,
        //         sysMenuId: element.idmenu
        //     }
        //     lstdataInsert.push(scone);
        // }
        // await this.models.TMT340FORMITEMNM.bulkCreate(lstdataInsert);
        // lstPhongbanMongo.forEach(phongban => {
        //     let phongbanvover = {
        //         lang: 'vi',
        //         tenphongban: phongban.tenphongban,
        //         state: phongban.state,
        //         fatherId: 0,
        //         orderNum: phongban.orderNum
        //     }
        //     lstphongbancover.push(phongbanvover)
        // })
       // await this.models.sys_department.bulkCreate(lstphongbancover);
        
        // const lstRole = await RoleMongo.find({}).populate('dacquyen');
        // let lstrole_dq = [];
        // for(let element of lstRole) {
        //     // const rl = await this.sequelize.query("SELECT * FROM sys_roles WHERE  rolename = ?", {
        //     //     replacements: ['Admin'],
        //     //     type: QueryTypes.SELECT
        //     // });
        //     const rlOne = await this.models.sys_role.findOne({where : {rolename: element.rolename}});
        //     if(rlOne) {
        //         let listmenus = [];
        //         for(let e of element.dacquyen) {
        //             console.log(e._id.toString())
        //             const m = await this.models.sys_menu.findOne({where: {id: e._id.toString()}});
        //             listmenus.push(m);
        //         }
        //         await rlOne.setSys_menus(listmenus);
        //     }
        // }
       
       // await this.models.sys_role.bulkCreate(lstrolecover);
       // await this.addRoleDQ(lstrole_dq);
        // const strSql = "SELECT * FROM sys_menus";
        // const rlOne = await this.models.sys_role.findOne({where : {rolename: "Dev"}});
        // const rl = await this.sequelize.query("SELECT * FROM sys_roles WHERE  rolename = ?", {
        //     replacements: ['Admin'],
        //     type: QueryTypes.SELECT
        // });
        // console.log(rl);
        // let lstmenucover = []
        for(let user of lstUserMongo) {
            // let ucover = {
            //     name: user.name,
            //     password: user.password,
            //     available: user.available,
            //     sex: user.sex,
            //     dienthoai: user.dienthoai,
            //     email: user.email,
            //     lastLoginTime: user.lastLoginTime,
            //     avatar: null,
            //     phongban_id: 1,
            //     sysDepartmentId: 1
            // }

            // const u =  await this.models.sys_user.findOne({where: {email: user.email}});
            // if(u) {
            //     const lstUrAll = [1,2,3,4];
            //     if(u.email === "namandroid.it@gmail.com") {
            //         // const lstAllrole = await this.models.sys_role.findAll({});
            //         // u.setSys_roles(lstAllrole);
            //     } else {
            //         const roUser = await this.models.sys_role.findOne({where: {id: 2}});
            //         u.setSys_roles(roUser);
            //     }
            // }

            //lstusercover.push(ucover);
        }
        //await this.models.sys_user.bulkCreate(lstusercover);


       
        // lstMenuMongo.forEach(menu => {
        //     let menucover = {
        //         id: menu._id.toString(),
        //         lang: menu.lang,
        //         menuName: menu.menuName,
        //         code: menu.code,
        //         fatherId: menu.fatherId + "",
        //         orderNum: menu.orderNum,
        //         path: menu.path,
        //         menuType: menu.menuType,
        //         visible: menu.visible,
        //         status: menu.status,
        //         icon: menu.icon,
        //         alIcon: menu.alIcon,
        //         newLinkFlag: menu.newLinkFlag
        //     }
        //     lstmenucover.push(menucover);
        // })
    
        //await this.models.sys_menu.bulkCreate(lstmenucover);
        //return  this.models.sys_menu.findAll({});
        return 0;
    }
}

module.exports = SysMenuFindAllProcess;

//http://localhost:3006/api/menu/demofindAllMenu

/* 
    SELECT m.code AS mCode FROM sys_roles r 
    LEFT JOIN role_menu rm ON r.id = rm.sysRoleId
    LEFT JOIN sys_menus m ON rm.sysMenuId = m.id
    AND m.lang = 'vi' 
    WHERE r.id = 1


SELECT  p.id,p.lang,p.menuName,p.code,p.fatherId,p.orderNum,p.path,p.menuType,p.visible,p.status,p.newLinkFlag,p.alIcon,p.icon,p.createdAt,p.updatedAt FROM user_role ur 
      JOIN role_menu rp ON ur.sysRoleId = rp.sysRoleId
      JOIN sys_menus p ON rp.sysMenuId = p.id
      AND p.lang = 'vi'
      WHERE ur.sysUserId =  3
      GROUP BY p.id 

*/