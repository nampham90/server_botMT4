const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tmt150Supply = sequelize.define('tmt150_supply', {
        SPPLYCD: {
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        SPPLYNM: {
            type: DataTypes.STRING(80),
        },
        SPPLYRNM: {
            type: DataTypes.STRING(40),
        },
        SPPLYZIP: {
            type: DataTypes.STRING(8),
        },
        SPPLYADRS1: {
            type: DataTypes.STRING(100),
        },
        SPPLYADRS2: {
            type: DataTypes.STRING(100),
        },
        SPPLYADRS3: {
            type: DataTypes.STRING(100),
        },
        SPPLYTEL: {
            type: DataTypes.STRING(12),
        },
        SPPLYFAX: {
            type: DataTypes.STRING(12),
        },
        SPPLYUSRNM: {
            type: DataTypes.STRING(20),
        },
        SPPLYMAILADRS: {
            type: DataTypes.STRING(100),
        },
        SPPLYREMARK: {
            type: DataTypes.STRING(100),
        },
    })

    return Tmt150Supply;
}