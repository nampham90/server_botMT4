const { DataTypes } = require('sequelize');

module.exports = (sequlize) => {
    const Tot010STS = sequlize.define('tot010_sts', {
        SOODNO: {
            type: DataTypes.STRING(16),//  
            primaryKey: true
        },
        QTESTS: {
            type: DataTypes.BOOLEAN,//  báo giá
            defaultValue: false
        },
        ORDSTS: {
            type: DataTypes.BOOLEAN,//  đặt hang
            defaultValue: false
        },
        ORDAPPSTS: {
            type: DataTypes.BOOLEAN,//  chờ duyệt đặt hàng
            defaultValue: false
        },
        PAYSTS: {
            type: DataTypes.BOOLEAN,//  thanh toán
            defaultValue: false
        },
        SHIPSTS: {
            type: DataTypes.BOOLEAN,//  xuất hàng
            defaultValue: false
        },
        RSLTSENDFLG: {
            type: DataTypes.BOOLEAN,// cờ thực tế xuất hàng
            defaultValue: false
        },
        SOCNCLORDFLG: {
            type: DataTypes.BOOLEAN,//  cờ trả hàng
            defaultValue: false
        },
        SOCNCLCOMPFLG: {
            type: DataTypes.BOOLEAN,//  cờ hoàn thành trả hang
            defaultValue: false
        },
        EXCHANGEFLG: {
            type: DataTypes.BOOLEAN,//  cờ đổi hàng
            defaultValue: false
        },
        EXCHANGECOMPFLG: {
            type: DataTypes.BOOLEAN,//  cờ hoàn thành đổi hàng
            defaultValue: false
        }
    },{
        timestamps: true,
      })

    return Tot010STS;
}