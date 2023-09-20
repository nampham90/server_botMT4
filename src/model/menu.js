module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        lang: String,
        id: Number | String,
        menuName: String,
        code: String,
        fatherId: Number | String,
        orderNum: Number | String,
        path:  {type:String, unique:true},
        menuType: String,
        visible: Boolean,
        status: Boolean,
        icon: String,
        alIcon: String,
        newLinkFlag: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const menu = dbcon.dbDemo.model("menu", schema);
    return menu;
};