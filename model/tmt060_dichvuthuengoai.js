// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          tennhacungcap: String, // ten người cung cấp.vd: Anh Long
          maloai: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"tmt050"
          }, // mã loại dịch vụ. luu trong bang tmt050
          diachi: String, // dia chi
          sodienthoai: String,//
          status01: String, 
          status02: String, 
          status03: String, 
          status04: String,
          status05: String,
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt060_dichvuthuengoai = dbcon.dbDemo.model("tmt060_dichvuthuengoai", schema);
      return tmt060_dichvuthuengoai;
  };