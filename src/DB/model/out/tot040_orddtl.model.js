const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tot040Orddtl = sequelize.define('tot040_orddtl', {
        SOODNO: {
            type: DataTypes.STRING(16),//  mã hóa đơn
            primaryKey: true
        },
        // giúp xác định số lượng sản phẩm trong kho có cùng productcd, qtycd, gia nhap
        PRODUCTGROUPCD: { // group productcd, qtycd, gia nhap
            type: DataTypes.STRING(20),
        },
        SODTLNO: {
            type: DataTypes.INTEGER,//  số thứ tự trong đơn
            primaryKey: true
        },
        SOPRICE: {
            type: DataTypes.DOUBLE,//  giá bán 
        },

        ORDLIMITDATE: {
            type: DataTypes.DATE,
        },
        SHIPMNTORDQTY: {
            type: DataTypes.INTEGER,// số lượng đặt hàng
        },
        SHIPMNTORDREMAINQTY: {
            type: DataTypes.INTEGER,// số lượng cho phép
        },
        WARRANTY: {
            type: DataTypes.INTEGER,// số thang bao hanh
        },
        SOREMARK: {
            type: DataTypes.STRING(256)// ngày hết hạn
        }
    },{
        timestamsp: true
    });
    return Tot040Orddtl;
}