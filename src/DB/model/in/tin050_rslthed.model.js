const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tin050RsltHed = sequelize.define('tin050_rslthed', {
        SIPLNNO: {
            type: DataTypes.STRING(16),//  
            primaryKey: true
        },
        ARVLPLNDATE: { // ngày nhập hang
            type: DataTypes.DATE,
        },
        ARVLRSLTDATE: { // trường hợp trả lại hàng, ngày trả hàng
            type: DataTypes.DATE,
        },

        SIRSLTDATE: { // trường hợp trả lại hàng, Ngày nhận hàng
            type: DataTypes.DATE,
        },

        SIREMARK: { // ghi chủ đơn hàng
            type: DataTypes.STRING(256) 
        },
    });

    return Tin050RsltHed;
}