
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        idnguonxe: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"nguonxe"
        }],
        biensoxe: {type:String, unique:true},
        anhdaidien: String,
        tenxegoinho: String,
        trongtai: String,
        trangthai: Boolean, // true dang chay, false nghi
        vitrihientai: String // vi tri hien tai của xe
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
