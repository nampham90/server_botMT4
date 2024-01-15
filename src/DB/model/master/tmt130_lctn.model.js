const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Tmt130Lctn = sequelize.define('tmt130_lcnt', {
        LCTNCD: { //mã số hoặc mã vạch đặc trưng của vị trí.
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        DESCRIPTION: { // mô tả chi tiết về vị trí lưu trữ.
            type: DataTypes.STRING(255),
        },

        AREA: { // phân loại khu vực lưu trử
            type: DataTypes.STRING(10),
        },

        FLOOR: { //Thông tin về tầng hoặc mức lưu trữ của vị trí.
            type: DataTypes.STRING(10),
        },

        ROW: { // Số hàng trong vị trí.
            type: DataTypes.INTEGER,
        },

        // Số cột trong vị trí.
        COLUNM: {
            type: DataTypes.INTEGER,
        },

        STATUS: { // Trạng thái của vị trí, ví dụ:0 còn trống,1 đã sử dụng,2 đang bảo trì.
            type: DataTypes.STRING(1), 
        },

        CAPACITY: {// Sức chứa tối đa của vị trí lưu trữ (số lượng hàng hóa tối đa có thể chứa).
            type: DataTypes.INTEGER,
        }
    })

    return Tmt130Lctn;
}