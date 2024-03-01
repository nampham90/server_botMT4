const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tin020Planhed = sequelize.define('tin020_planhed', {
        SIPLNNO: {
            type: DataTypes.STRING(16),//  
            primaryKey: true
        },
        ARVLPLNDATE: {
            type: DataTypes.DATE,
        },
        SIREMARK: {
            type: DataTypes.STRING(256) 
        },
    })

    return Tin020Planhed;
}