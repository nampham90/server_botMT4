module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        tenphongban: {
            type: String,
            required: true,
            min: 3,
            max: 255
        },
        fatherId: Number | String,
        state: Boolean,
        orderNum: Number
      
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const phongban = mongoose.model("phongban", schema);
    return phongban;
};