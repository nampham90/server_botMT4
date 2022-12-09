
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        tenkho: String,
        diachikho: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const kho = mongoose.model("kho", schema);
    return kho;
};
