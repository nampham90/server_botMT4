module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        rolename: {
            type: String,
            required: true,
            min: 3,
            max: 255
        },
        mota: {
          type: String,
          required: true,
          min: 3,
          max: 255
        },
        dacquyen: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"menu"
       }]
      
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const role = mongoose.model("role", schema);
    return role;
};