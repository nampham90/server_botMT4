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
            type: DataTypes.STRING(256)
        },
        dienthoai: {
            type: DataTypes.STRING(256)
        },
        desc: { // mo tả khách hàng
            type: DataTypes.STRING(256)
        }, // số nhà: vd: 05 Lâm hoàng
        BUYERNMENC: {
            type: DataTypes.STRING(256)
        }, // phường xã
        BUYERADRS1ENC : {
            type: DataTypes.STRING(256)
        },// quận huyện
        BUYERADRS2ENC: {
            type: DataTypes.STRING(256)
        },// tỉnh thành
        BUYERADRS3ENC: {
            type: DataTypes.STRING(256)
        },
        email: {
            type: DataTypes.STRING(256)
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