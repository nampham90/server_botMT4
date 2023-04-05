
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
         idchuyen: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"chuyen"
         }, // mã chyến hàng
         biensoxe: String, // biến số xe
         iduser: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
         },// mã khách hàng
         tiencuoc:Number,// tiền cươc xe của 1 loại hàng
         lotrinh: String, // lộ trình vận chuyển đi hay lộ trình hàng về
         ngaynhap: Date,
         noidungdonhang:String, // nôi dung đơn hàng. vd: gửi gạch đi phú quốc
         diadiembochang:String,  // Địa chỉ bọc hàng
         tennguoinhan: String,
         sdtnguoinhan: String,
         diachinguoinhan: String,
         hinhthucthanhtoan:Number, // ghi no => 1, truc tiep => 2, thanh toan khi nhan hang => 3 
         ghichu: String, // ghi chú đơn hàng
         trangthai: Number, // 0 lưu dự định nhập. 1 hoàn thành việc nhập. 2, khóa chuyến hàng
         status01:Number,// 0 chưa giao hàng. 1 đã giao hàng
         status02:Number,
         status03:Number,
         status04:Number,
         status05:Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const phieunhaphang = dbcon.dbDemo.model("phieunhaphang", schema);
    return phieunhaphang;
};