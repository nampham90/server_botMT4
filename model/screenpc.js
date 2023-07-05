module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        idmenu:String,
        lang:String,
        title1: String,
        title2: String,
        vitri: Number,
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const screenpc = dbcon.dbDemo.model("screenpc", schema);
    return screenpc;
};