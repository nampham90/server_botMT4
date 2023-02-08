
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        idphieunhap: String, // mã phiếu nhập
        iduser: String, // mã khách hàng
        tenhang: String, // tền hàng gửi
        dongia: Number, // đơn giá
        soluong: Number, 
        donvitinh: String,
        thanhtien: Number,
        chiphiphatsinh: Number,// chi phí phát sinh trên đơn hàng
        ngaylap: Date
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const hoadonnhaphang = dbcon.dbDemo.model("hoadonnhaphang", schema);
    return hoadonnhaphang;
};