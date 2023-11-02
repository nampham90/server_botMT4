const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ProductSize = sequelize.define('product_size', {
        // Id size
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // Tên tesi
        size_name: {
            type: DataTypes.STRING(100)
        },

    })

    return ProductSize;
}