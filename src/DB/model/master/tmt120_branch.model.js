const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tmt120Branch = sequelize.define('tmt120_branch', {
        // mã kho
        brnchcd: {
            type: DataTypes.STRING(10),//  
            primaryKey: true
        },

        // Tên kho
        branch_name: {
            type: DataTypes.STRING(100)
        },

        // mô tả kho
        branch_description: {
            type: DataTypes.STRING(255)
        },

        // zip kho
        branch_zip: {
            type: DataTypes.STRING(8)
        },

        // địa chỉ dòng 1
        branch_address1: {
           type: DataTypes.STRING(100)
        },

        // địa chỉ dòng 2
        branch_address2: {
           type: DataTypes.STRING(100)
        },

        // địa chỉ dòng 4
        brnch_address3: {
           type: DataTypes.STRING(100)
        },

        // số điện thoại kho
        brnch_tel: {
            type: DataTypes.STRING(14),
        }
    },
    {
      timestamps: true,
    })

    return Tmt120Branch;
}