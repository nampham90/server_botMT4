const MenuDto = require("./menuDto")
class DatascDto {
    constructor(DatascEntity) {
        this.id = DatascEntity.id;
        this.lang = DatascEntity.lang;
        this.title1 = DatascEntity.title1;
        this.title2 = DatascEntity.title2;
        this.status = DatascEntity.status;
        this.vitri = DatascEntity.vitri;
        this.menu = new MenuDto(DatascEntity.menu_id);
        this.createdAt = DatascEntity.createdAt;
        this.updatedAt =  DatascEntity.updatedAt;
    }
}

module.exports = DatascDto;