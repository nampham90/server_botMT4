const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Tmt140Quality = sequelize.define('tmt140_quality', {
        QTYCD: {
            type: DataTypes.STRING(2),
            primaryKey: true,
        },
        QTYNM: {
            type: DataTypes.STRING(50),
        },
    });
    return Tmt140Quality;
}