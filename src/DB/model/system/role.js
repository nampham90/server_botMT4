const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define('sys_role', {
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
        rolename: {
            type: DataTypes.STRING(50),
        },
        mota: {
            type: DataTypes.STRING(100)
        }
    
    }, {
        timestamps: true,
      });
    return Role;
}