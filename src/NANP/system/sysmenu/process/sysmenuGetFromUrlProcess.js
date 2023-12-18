const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
let Responses = require('../../../../common/response');
let ObjDataSC = Responses.ObjectDataSC;

class SysMenuGetFromUrlProcess extends AbstractProcess {

    constructor() {
        super()
    }

    async getMenuFromUrl(req) {
        return this.execute(req);
    }


    async process(req) {
        let lstdata = [];
        const Menu = await this.models.sys_menu.findOne({where: {path :req.body.url}});
        if(Menu) {
            const listDatasc = await this.models.TMT340FORMITEMNM.findAll({
                where: {menu_id:Menu.id,lang: req.lang}
            })
            let stt = 1;
            let idyoutube = "";
            for(let element of listDatasc) {
                let obj = new ObjDataSC(element.vitri,element.title1,element.title2, idyoutube);
                lstdata.push(obj);
                stt++;
            }
            lstdata = lstdata.sort((a, b) => a.vitri - b.vitri);
            return lstdata
        } else {
            return lstdata;
        }
    }



}

module.exports = SysMenuGetFromUrlProcess;