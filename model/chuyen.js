
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        ngaydi: Date,
        ngayve:Date,
        tienxe: Number, // tiền đưa trước
        biensoxe: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"xe"
        },
        idtai: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
        },
        idphu: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
        },
        soodt: String,
        changduong: String, // điểm khởi hành và điểm kết thúc
        trangthai: Number, // 0 khởi tạo. 1.tinh chi phí. 2. hoàn thành chuyến
        status01:Number,
        status02:Number,
        status03:Number,
        status04:Number,
        status05:Number,
        ghichu: String
      },
      { timestamps: true }
    );
    schema.index({'soodt': 'text'});
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const chuyen = dbcon.dbDemo.model("chuyen", schema);
    return chuyen;
};