const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Menu = sequelize.define(
    'menu',
    {
      id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
      },
      lang: {
        type: DataTypes.STRING(3),
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
        allowNull: false,
      },
      menuType: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      alIcon: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      newLinkFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Menu;
};