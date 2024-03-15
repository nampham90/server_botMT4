const { DataTypes } = require('sequelize');

module.exports = (sequlize) => {
    const Tmt280Div = sequlize.define('tmt280_div', {
        DIVKBN: {
            type: DataTypes.STRING(4),//  
            primaryKey: true
        },
        DIVNM: {
            type: DataTypes.STRING(40),
        },
        DIVRNM: {
            type: DataTypes.STRING(40)
        }
    }, {
        timestamsp: true
    })

    return Tmt280Div;
}