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

        // mã viết tắt danh mục tối đa 3 ký tự, được viết tăt theo tên tiêng anh củ kinh kiện đó
        // vd : bàn phim . KB
        catid: {
            type: DataTypes.STRING(3)
        },

        // mô tả danh mục
        description: {
            type: DataTypes.STRING(255)
        },

        fatherId: {
            type: DataTypes.INTEGER
        },
    },
    {
      timestamps: true,
    })

    return ProductCategory;
}