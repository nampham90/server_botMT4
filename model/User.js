module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 225
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        role_id: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"role"
        }],
        account_id:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:"account"
        }],
        menulist: []
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const user = mongoose.model("user", schema);
    return user;
};
