const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tin060Rsltdtl = sequelize.define('tin060_rsltdtl', {
        SIPLNNO: {
            type: DataTypes.STRING(16),//  mã đơn hàng nhập
            primaryKey: true
        },

        INSTRCD: {
            type: DataTypes.STRING(16),//  Mã sản phẩm trong kho (IS), tạo ra khi có mỗi lần nhập hàng
            primaryKey: true
        },

        SIDTLNO: {
            type: DataTypes.INTEGER,//  mã số lần nhập
            primaryKey: true
        },

        ARVLPLNQTY: {
            type: DataTypes.INTEGER,//số lượng dự kiến
        },

        ARVLRSLTQTY: {
            type: DataTypes.INTEGER,//số lượng Thực tế đã nhận
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

    return Tin060Rsltdtl;
}