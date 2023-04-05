
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        datacd:  {type:String, unique:true},// mã nguôn xe
        datanm: String,
        datarnm: String,
        sodienthoai: String,
        diachi: String,
        thongtinthanhtoan1: String,
        thongtinthanhtoan2: String,
        status01: Number,// status01 = 0; nguồn nhà =1 nguồn từ bên ngoài
        status02: Number,
        status03: Number,
        status04: Number,
        status05: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const nguonxe = dbcon.dbDemo.model("nguonxe", schema);
    return nguonxe;
};
