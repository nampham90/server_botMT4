const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tot040Orddtl = sequelize.define('tot040_orddtl', {
        SOODNO: {
            type: DataTypes.STRING(16),//  mã hóa đơn
            primaryKey: true
        },
        SODTLNO: {
            type: DataTypes.INTEGER,//  số thứ tự trong đơn
            primaryKey: true
        },
        SOPRICE: {
            type: DataTypes.DOUBLE,//  giá bán 
        },
        SHIPMNTORDQTY: {
            type: DataTypes.INTEGER,// số lượng đặt hàng
        },
        SHIPMNTORDREMAINQTY: {
            type: DataTypes.INTEGER,// số lượng cho phép
        },
        SOREMARK: {
            type: DataTypes.STRING(256)// ngày hết hạn
        }
    },{
        timestamsp: true
    });
    return Tot040Orddtl;
}