
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        tenkho: String,
        diachikho: String,
        status01: Number,
        status02: Number,
        status03: Number,
        status04: Number,
        status05: Number,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const kho = dbcon.dbKhochung.model("kho", schema);
    return kho;
};
