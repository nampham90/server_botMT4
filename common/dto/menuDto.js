class MenuDto {
    constructor(MenuEnity) {
        this.is = MenuEnity.id;
        this.lang = MenuEnity.lang;
        this.menu_name = MenuEnity.menu_name;
        this.code = code;
        this.father_id = MenuEnity.father_id;
        this.order_num = MenuEnity.order_num;
        this.path = MenuEnity.path;
        this.menu_type = MenuEnity.menu_type;
        this.visible = MenuEnity.visible;
        this.status = MenuEnity.status;
        this.icon = MenuEnity.icon;
        this.al_icon = MenuEnity.al_icon;
        this.is_new_link = MenuEnity.is_new_link;
        this.create_time = MenuEnity.create_time;
        this.update_time = MenuEnity.update_time;
    }
}

module.exports = MenuDto