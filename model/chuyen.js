
module.exports = mongoose => {
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
        changduong: String // điểm khởi hành và điểm kết thúc
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const chuyen = mongoose.model("chuyen", schema);
    return chuyen;
};