
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          idchuyenngoai: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"chuyenngoai"
          }, // mã chyến hàng
          thongtindonhang: String,
          diadiembochang: String,  // 
          tiencuoc:Number,
          tiencuocxengoai: Number,

          htttxengoai: Number,
          htttkhachhang: Number,

          tennguoinhan: String,
          sdtnguoinhan: String,
          diachinguoinhan: String,

          status01: Number, // trang thai don hang. =0 chưa bóc. =1 đã bóc, =2 đã giáo
          status02: Number, // trang thai xuất. =0 không cần lấy hóa đơn. =1 cân lấy hóa đơn
          status03: Number, 
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