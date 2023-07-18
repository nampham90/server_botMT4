
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          idchuyenngoai: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"chuyenngoai"
          }, // mã chyến hàng
          soodn: String,
          soid: String,
          nguonxe: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"nguonxe"
          },
          tenhang: String,
          soluong: Number,
          trongluong: Number, //vd : 0.23, 1.4;
          khoiluong: Number, //vd : 0.4, 0.23
          donvitinh:String, // khôi , tấn , kg, kiện
          diadiembochang: String,  // 
          tiencuoc:Number,
          tiencuocxengoai: Number,

          htttxengoai: String,
          idkhachhang: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
          },
          htttkhachhang: String,
          tennguoinhan: String,
          sdtnguoinhan: String,
          diachinguoinhan: String,

          status01: Number, // trang thai don hang. =0 chưa bóc. =1 đã bóc, =2 đã giáo
          status02: String, // trang thai xuất. =0 không cần lấy hóa đơn. =1 cân lấy hóa đơn =2 đã lấy hóa đơn
          status03: Number, // trạng thái cập nhật 0 = cho phep phép cập nhất 1 = không cho phep cập nhật
          status04: Number,
          status05: Number,
          ghichu: String
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const chitietchuyenngoai = dbcon.dbDemo.model("chitietchuyenngoai", schema);
      return chitietchuyenngoai;
  };