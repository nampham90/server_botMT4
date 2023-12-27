const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('product', {
        // ma san pham
        id: {
            type: DataTypes.STRING(10),//  Danh muc + ten viet tắt sản phẩm (BPE12312312)
            primaryKey: true
        },

        // ngôn ngữ
        lang: {
            type: DataTypes.STRING(3),// 
            primaryKey: true
        },

        // Tên sản phẩm
        product_name: {
            type: DataTypes.STRING(100)
        },

        // mô tả sản phẩm 
        description: {
            type: DataTypes.STRING(255)
        },

        // giá sản phẩm
        price: {
            type: DataTypes.DECIMAL(10, 2),
        },

        // tồn kho
        stock: {
            type: DataTypes.INTEGER,
        },

        // đánh dấu sản phẩm gộp / 1 là sản phẩm gộp/ 
        is_composite: {
            type: DataTypes.BOOLEAN,
        },

        // hình ảnh sản phẩm
        image: {
            type: DataTypes.STRING(255),
        }
    },
    {
      timestamps: true,
    })

    return Product;
}