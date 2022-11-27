const { string } = require("joi");

module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        available: Boolean,
        sex: Number,
        email: {
            type: String,
            required: true,
            min: 6,
            max: 225
        },
        dienthoai: {
            type: String,
            required: true,
            max: 12
        },
        zalo: String,
        diachi:String,
        sotienno:Number,
        groupid:String,
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
        menulist: [],
        phongban_id: String,
        lastLoginTime: Date
      },
      { timestamps: true }
    );
    
    schema.index({'name': 'text'});
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const user = mongoose.model("user", schema);
    
    return user;
};
