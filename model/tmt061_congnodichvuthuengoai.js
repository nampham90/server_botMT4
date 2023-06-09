// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          soID: String,
          manhacungcap: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"tmt060_dichvuthuengoai"
          }, // mã nhà cung cập. 
          sotien: Number, // số tiền phí dịch vụ
          ngaylamviec: Date, // ngày 
          status01: String, // "0" chưa thanh toán. "1 đã thanh toán"
          status02: String, 
          status03: String, 
          status04: String,
          status05: String
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt061_congnodichvuthuengoai = dbcon.dbDemo.model("tmt061_congnodichvuthuengoai", schema);
      return tmt061_congnodichvuthuengoai;
  };