
module.exports = mongoose => {
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
         hinhthucthanhtoan:Number, // ghi no => 1, truc tiep => 2, thanh toan khi nhan hang => 3 
         ghichu: String, // ghi chú đơn hàng
         trangthai: Number // 0 lưu dự định nhập. 1 hoàn thành việc nhập. 2, khóa chuyến hàng
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