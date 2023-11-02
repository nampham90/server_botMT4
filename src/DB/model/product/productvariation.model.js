const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ProductVariation = sequelize.define('product_variation', {
        // Id biến thể 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // ngôn ngữ
        lang: {
            type: DataTypes.STRING(3),// 
            primaryKey: true
        },

        // Tên biến thê
        variation_name: {
            type: DataTypes.STRING(100)
        },

        // giá biến thể
        variation_price: {
            type: DataTypes.DECIMAL(10, 2)
        },

        // tồn kho biến thể
        variation_stock: {
            type: DataTypes.INTEGER,
        },

        //hinh ảnh biến thể 

        variation_image: {
            type: DataTypes.STRING(255),
        }
    })

    return ProductVariation;
}