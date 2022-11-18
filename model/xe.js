
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        biensoxe: {type:String, unique:true},
        anhdaidien: String,
        tenxegoinho: String,
        trongtai: String,
        trangthai: Boolean // true dang chay, false nghi
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const xe = mongoose.model("xe", schema);
    return xe;
};
