const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tin040Plandtl = sequelize.define('tin040_plandtl', {
        SIPLNNO: {
            type: DataTypes.STRING(16),//  
            primaryKey: true
        },

        SODTLNO: {
            type: DataTypes.INTEGER,//  số thứ tự trong đơn
            primaryKey: true
        },

        ARVLPLNQTY: {
            type: DataTypes.INTEGER,//số lượng dự kiến đến
        },

        ARVLPLNREMAINQTY: {
            type: DataTypes.INTEGER,//số lượng dự kiến còn lại() =số lượng dự kiến đến - số lượng thực tế Tin060 
        },

        LIMITDATE: {  // ngày hết hạn
            type: DataTypes.DATE,
        },

        GUARANTEQTY: { // sô tháng bao hành
            type: DataTypes.INTEGER,
        },

        SIPRICE: {
            type: DataTypes.DOUBLE,//  giá nhập hàng
        },

        SIDTLREMARK: { // ghi chú chi tiết
            type: DataTypes.STRING(256),//  
        },

        PRODUCTGRPCD: { // mã group sản phẩm, phân loại sản phẩm theo group
            type: DataTypes.STRING(20),//  
        }
    }, {
        indexes: [
            {
                name: 'public_by_product',
                fields: ['PRODUCTGRPCD'],
                where: {
                  status: 'public'
                }
            },
        ]
    })

    return Tin040Plandtl;
}