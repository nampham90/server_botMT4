const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('sys_user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        available: {
            type: DataTypes.BOOLEAN
        },
        sex: {
            type: DataTypes.INTEGER
        },
        dienthoai: {
            type: DataTypes.BIGINT
        },
        email: {
            type: DataTypes.STRING(50)
        },
        lastLoginTime: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: true,
      })

    return User;
}