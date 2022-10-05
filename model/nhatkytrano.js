
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
         iduser: String, // mã khách hàng
         sotientra: Number, // số tiền trả
         hinhthucthanhtoan: String, // hinh thức thánh toán
         ngaytra: Date,
         ghichu: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const nhatkytrano = mongoose.model("nhatkytrano", schema);
    return nhatkytrano;
};