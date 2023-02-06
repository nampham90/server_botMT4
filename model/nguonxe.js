
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        datacd: String,
        datanm: String,
        datarnm: String,
        stataus01: Number,
        stataus02: Number,
        stataus03: Number,
        stataus04: Number,
        stataus05: Number
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
