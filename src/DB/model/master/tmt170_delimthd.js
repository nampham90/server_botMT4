const {DataTypes} = require('sequelize');

module.exports = (sequlize) => {
    const Tmt170Delimthd = sequlize.define('tmt170_delimthd', {
        DELIMTHCD: {
            type: DataTypes.STRING(4),//  
            primaryKey: true
        },
        DELIMTHNM: {
            type: DataTypes.STRING(80),//  

        }
    },{
        timestamsp: true
    });

    return Tmt170Delimthd;
}