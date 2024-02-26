const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tst010Stck = sequelize.define('tst010_stck', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        SERIALNUM: {// số serial number
            type: DataTypes.STRING(16),
        },

        PURPIRCE: {// gia nhập
            type: DataTypes.DOUBLE,
        },

        TECHNICALPRICE: { // giá kỷ thuật
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },

        SELLPIRCE: {// gia bán le 
            type: DataTypes.DOUBLE,
        },

        ALLWQTY: { // số lượng sẳn có
            type: DataTypes.INTEGER,
        },

        STCKQTY: { // số lượng trong kho
            type: DataTypes.INTEGER,
        },

        RECEIVEDATE: { // ngày nhập hàng
            type: DataTypes.DATE,
        },

        LIMITDATE: { // ngày hết hạng
            type: DataTypes.DATE,
        },

        IMAGE: {
            type: DataTypes.STRING(100)
        },

        DESCRIPTION: {
            type: DataTypes.STRING(400)
        },

        STATUS: {// trạng thái sản phẩm 0: trong kho. 1, chọn báo giá, 2, đã được đặt hàng, 3, đã bán, 4 đang bảo hành
            type: DataTypes.STRING(1)
        },

        STRRSRV1: { // người bán, người đặt
            type: DataTypes.STRING(256)
        }, 
        STRRSRV2: { // khác hàng mua, khách hàng bảo hàng
            type: DataTypes.STRING(256)
        },
        STRRSRV3: {
            type: DataTypes.STRING(256)
        },
        STRRSRV4: {
            type: DataTypes.STRING(256)
        },
        STRRSRV5: {
            type: DataTypes.STRING(256)
        }
    })

    return Tst010Stck;
}