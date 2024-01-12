const { DataTypes } = require('sequelize');

module.exports = (sequlize) => {
    const Tmt050Name = sequlize.define('tmt050_name', {
        RCDKBN: {
            type: DataTypes.STRING(4),//  
            primaryKey: true
        },
        DATACD: {
            type: DataTypes.STRING(40),
            primaryKey: true
        },
        DATANM: {
            type: DataTypes.STRING(40)
        },
        STRRSRV1: {
            type: DataTypes.STRING(256)
        },
        STRRSRV2: {
            type: DataTypes.STRING(256)
        },
        STRRSRV3: {
            type: DataTypes.STRING(256)
        },
        STRRSRV4: {
            type: DataTypes.STRING(256)
        },
        STRRSRV5: {
            type: DataTypes.STRING(256)
        }
    }, {
        timestamsp: true
    })

    return Tmt050Name;
}