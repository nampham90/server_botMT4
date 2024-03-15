const { DataTypes } = require('sequelize');

module.exports = (sequlize) => {
    const Tmt010Company = sequlize.define('tmt010_company', {
        CMPNYCD: {
            type: DataTypes.STRING(8),//  
            primaryKey: true
        },
        CMPNYNM: {
            type: DataTypes.STRING(80),
        },
        CMPNYRNM: {
            type: DataTypes.STRING(40)
        },
        CMPNYZIP: {
            type: DataTypes.STRING(8)
        },
        CMPNYADRS1: {
            type: DataTypes.STRING(256)
        },
        CMPNYADRS2: {
            type: DataTypes.STRING(256)
        },
        CMPNYADRS3: {
            type: DataTypes.STRING(256)
        },
        CMPNYEMAIL: {
            type: DataTypes.STRING(256)
        },
        CMPNYMAILADRS: {
            type: DataTypes.STRING(256)
        },
        CMPNYURL: {
            type: DataTypes.STRING(256)
        }
    }, {
        timestamsp: true
    })

    return Tmt010Company;
}