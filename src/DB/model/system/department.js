const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Department = sequelize.define('sys_department', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        lang: {
            type: DataTypes.STRING(3),
            primaryKey: true,
            allowNull: false,
        },
        tenphongban: {
            type:DataTypes.STRING(255)
        },
        state: {
            type: DataTypes.BOOLEAN
        },
        fatherId: {
            type: DataTypes.INTEGER
        },
        orderNum: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: true,
      });
    return Department;
}