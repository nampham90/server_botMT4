const {DataTypes} = require('sequelize');

module.exports = (sequlize) => {
    const Tmt171Paymethd = sequlize.define('tmt171_paymethd', {
        PAYMETHDCD: {
            type: DataTypes.STRING(4),//  
            primaryKey: true
        },
        PAYMETHDNM: {
            type: DataTypes.STRING(80),//  

        }
    },{
        timestamsp: true
    });

    return Tmt171Paymethd;
}