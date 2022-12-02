
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        iduser: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
        }, // ID User
        hanhdong: String, // updete || delete || create
        table: String, //tên table thay đổi
        ngay: Date, // thời gian thực hiện hàn động đó. _now
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const nhatkykh= mongoose.model("nhatkyhethong", schema);
    return nhatkykh;
};