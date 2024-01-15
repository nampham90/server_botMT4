const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Tmt341File = sequelize.define('tmt341_file', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: {
            type: DataTypes.STRING(100)
        },
        path: {
            type: DataTypes.STRING(100)
        },
        typefile: {
            type: DataTypes.STRING(20)
        },

        sizefile: {
            type: DataTypes.STRING(10)
        }
    },{
        timestamps: true,
      });
    return Tmt341File;
}
