
module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        ticket: {type:String, unique:true},
        pair: String,
        direction: String,
        lot: String,
        price: String,
        sl: String,
        tp: String,
        opentime: String,
        comment: String,
        orderProfit:String,
        status:Boolean,
        accNumber: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const order = mongoose.model("order", schema);
    return order;
};
