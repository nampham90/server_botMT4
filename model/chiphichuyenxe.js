
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        idchuyen: String, // mã chuyến xe
        tenchiphi:String, // tên chi phí
        sotien: Number, // tiền chi trả
        ghichu: String, // ghi chú chi trả vd: tiền ăn, tiền cafe

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const chiphichuyenxe = dbcon.dbDemo.model("chiphichuyenxe", schema);
    return chiphichuyenxe;// chi phi cho 1 chuyến xe
};

// tiền ăn
// tiên bãi
// tiền dầu
// sữa chữa
// cầu đường
// công an
// chi phí khác
