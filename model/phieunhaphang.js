
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
         soID: String,
         idchuyen: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"chuyen" // khi nhập hàng null / khi add vào chuyến mơi có id chuyến hàng
         }, // mã chyến hàng
         biensoxe: String, // biến số xe // khi nhập hàng null/ khi add vào chuyên thì có biên số xe
         iduser: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
         },// mã khách hàng
         tiencuoc:Number,// tiền cươc xe của 1 loại hàng
         lotrinh: String, // lộ trình vận chuyển đi hay lộ trình hàng về
         ngaynhap: Date,
         noidungdonhang:String, // nôi dung đơn hàng. vd: gửi gạch đi phú quốc
         soluong: Number, //vd: 1 kiện, 2 tân, 3 kg
         donvitinh: String, //vd: kiện , tấn , kg, khối
         diadiembochang:String,  // Địa chỉ bọc hàng . khi nhập . mặc định là bãi xe. trong kho 
         tennguoinhan: String,
         sdtnguoinhan: String,
         diachinguoinhan: String,
         makho: String, //mã kho lưu hàng
         hinhthucthanhtoan:Number, // truc tiep => 1,  ghi nhợ=> 2, thanh toan khi nhan hang => 3 
         ghichu: String, // ghi chú đơn hàng
         trangthai: Number, // 0 lưu dự định nhập. 1 hoàn thành việc nhập. 2, khóa chuyến hàng, null. đang ở trong kho
         status01:Number,// 0 trongkho . 1 đã bóc hàng, 2 đã giao hàng, 
         status02:Number, // 0 trong kho. 1 vận chuyển, 2, xe ngoài vận chuyển
         status03:Number, // 
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