
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        datacd:  {type:String, unique:true},
        datanm: String,
        datarnm: String,
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
  
    const nguonxe = mongoose.model("nguonxe", schema);
    return nguonxe;
};
