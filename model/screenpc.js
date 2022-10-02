module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        idmenu:String,
        lang:String,
        title1: String,
        title2: String,
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const screenpc = mongoose.model("screenpc", schema);
    return screenpc;
};