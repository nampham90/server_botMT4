const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tin010STS = sequelize.define('tin010_sts', {
        SIPLNNO: {
            type: DataTypes.STRING(16),//  
            primaryKey: true
        },
        ARVLCOMPFLG: {
            type: DataTypes.STRING(1),//  
            defaultValue: '0'
        },
        SICOMPFLG: {
            type: DataTypes.STRING(1),//  
            defaultValue: '0'
        }, 
        RSLTSENDFLG: {
            type: DataTypes.STRING(1),//  
            defaultValue: '0'
        }
    })

    return Tin010STS;
}