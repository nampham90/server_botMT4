const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TCC030 = sequelize.define('tcc030_seqno', {
        prefix: {
            type: DataTypes.STRING(3),//  
            primaryKey: true
        },

        seqno: {
            type: DataTypes.INTEGER(6),//  
        },

        nokbnname: {
            type: DataTypes.STRING(40),
            allowNull: true
        },

        maxdigit: {
            type: DataTypes.INTEGER(9),//  
            allowNull: true
        }
    }, {
        timestamps: true,
    });

    return TCC030;
}