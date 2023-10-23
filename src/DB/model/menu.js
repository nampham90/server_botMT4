const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Menu = sequelize.define(
    'sys_menu',
    {
      id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
      },
      lang: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
      },
      menuName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      fatherId: {
        type: DataTypes.STRING(24), // Hoặc type: DataTypes.INTEGER nếu bạn muốn dùng số nguyên
        allowNull: false,
      },
      orderNum: {
        type: DataTypes.INTEGER, // Hoặc type: DataTypes.INTEGER nếu bạn muốn dùng số nguyên
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      menuType: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      alIcon: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      newLinkFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return Menu;
};