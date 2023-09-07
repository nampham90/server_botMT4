// table lưu danh sách video hướng dẫn : TMT101
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          idyoutube: String, // idyoutube vd: sdfadfa
          urldisplayid: String,// id màn hình hiển thị hướng dân: vd: spkh00101
          title: String, //tiêu đề video
          content: String, // nôi dung video
          status01: Number, 
          status02: Number, 
          status03: Number, 
          status04: Number,
          status05: Number,
        },
        { timestamps: true }
      );
      schema.index({'urldisplayid': 'text'});
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt101 = dbcon.dbDemo.model("tmt101", schema);
      return tmt101;
  };