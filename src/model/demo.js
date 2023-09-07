module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          idpro:Number,
          proname:String,
          price: Number,
          completed: Boolean
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const demo = dbcon.dbDemo.model("demo", schema);
      return demo;
  };