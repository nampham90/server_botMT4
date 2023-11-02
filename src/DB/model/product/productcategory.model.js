const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ProductCategory = sequelize.define('product_category', {
        // ma san pham
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // ngôn ngữ
        lang: {
            type: DataTypes.STRING(3),//  Danh muc + ten viet sản phẩm (BPE12312312)
            primaryKey: true
        },

        // Tên danh mục
        name: {
            type: DataTypes.STRING(100)
        },

        // mô tả danh mục
        description: {
            type: DataTypes.STRING(255)
        }
    },
    {
      timestamps: true,
    })

    return ProductCategory;
}