module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          sohdttxn: String,
          nguonxe: {
              type: mongoose.Schema.Types.ObjectId,
              ref:"nguonxe"
          },
          lstdata: [],
          ngayxuat: Date,
          ngaythanhtoan: Date | null,
          title: String, // tiêu đề
          lstheader: [], // mãng header layout trong const.headerlayout
          header: [],// tiêu để các trường trong table
          lstidcncn: [],// list id cộng nợ chuyến ngoài. 
          status01: Number, // sô lần xuất
          status02: Number, // 0 chưa thanh toán // 1 đã thanh toán
          status03: Number, 
          status04: Number,
          status05: Number,
          ghichu: String
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const donhangexportxengoai = dbcon.dbDemo.model("donhangexportxengoai", schema);
      return donhangexportxengoai;
  };