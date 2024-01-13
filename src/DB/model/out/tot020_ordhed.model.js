const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tot020Ordhed = sequelize.define('tot020_ordhed', {
        SOODNO: {
            type: DataTypes.STRING(16),//  
            primaryKey: true
        },
        ORDERDATE: {
            type: DataTypes.DATE,//  ngay dat hang
        },
        PAYOFDATE: {
            type: DataTypes.DATE,//  ngay thanh toan
        },
        SHIPDATE: {
            type: DataTypes.DATE,//  ngay xuat hang
        },
        SOPLNDATE: {
            type: DataTypes.DATE,//  ngay van chuyen
        },
        DELIPLNDATE: {
            type: DataTypes.DATE,//  ngay du kien hang den
        },
        DEPOSIT: {
            type: DataTypes.INTEGER,//  Đặt cọc
        },
        ODDISCONT: {
            type: DataTypes.INTEGER,//  Giảm giá
        },
        INSTALLFEE: {
            type: DataTypes.INTEGER,//  Phi lắp đặt
        },
        TAX: {
            type: DataTypes.INTEGER,//  VAT
        },
        POSTPAIDFLG: {
            type: DataTypes.BOOLEAN,//  cờ trả sau(đơn hàng nợ)
        },
        SOREMARK: {
            type: DataTypes.STRING(256) // ghi chu đơn hàng
        },
        PACKQTY : {
            type: DataTypes.INTEGER // số lượng box (bao nhiêu box đựng sản phẩm)
        }

    })

    return Tot020Ordhed;
}