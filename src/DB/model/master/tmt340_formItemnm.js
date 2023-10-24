const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Tmt340FormItemnm = sequelize.define('tmt340_formitemnm', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        lang: {
            type: DataTypes.STRING(3)
        },
        title1: {
            type: DataTypes.STRING(100)
        },
        title2: {
            type: DataTypes.STRING(100)
        },
        vitri: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN
        }
    },{
        timestamps: true,
      });
    return Tmt340FormItemnm;
}