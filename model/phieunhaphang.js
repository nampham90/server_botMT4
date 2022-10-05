const { string } = require("joi");

module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
         idchuyen: String, // mã chyến hàng
         biensoxe: String, // biến số xe
         iduser: String,// mã khách hàng
         tiencuoc:Number,// tiền cươc xe của 1 loại hàng
         lotrinh: String, // lộ trình vận chuyển đi hay lộ trình hàng về
         ngaynhap: Date,
         noidungdonhang:String, // nôi dung đơn hàng. vd: gửi gạch đi phú quốc
         ghichu: String // ghi chú đơn hàng
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const phieunhaphang = mongoose.model("phieunhaphang", schema);
    return phieunhaphang;
};