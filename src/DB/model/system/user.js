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
        taxcd: { // mã số thuế
            type: DataTypes.STRING(15)
        },
        dienthoai: {
            type: DataTypes.STRING(12)
        },
        desc: { // mo tả khách hàng
            type: DataTypes.STRING(256)
        },
        BUYERNMENC: {
            type: DataTypes.STRING(256)
        },
        BUYERADRS1ENC : {
            type: DataTypes.STRING(256)
        },
        BUYERADRS2ENC: {
            type: DataTypes.STRING(256)
        },
        BUYERADRS3ENC: {
            type: DataTypes.STRING(256)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        sinhnhat: {
            type: DataTypes.DATE
        },
        lastLoginTime: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: true,
      })

    return User;
}