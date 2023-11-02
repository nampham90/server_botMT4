const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ProductColor = sequelize.define('product_color', {
        // Id color
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
        // Tên color
        color_name: {
            type: DataTypes.STRING(100)
        },
    })

    return ProductColor;
}