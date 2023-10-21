const ErrorCode = {
    SYS_ERR_GLOBAL: [1000, "Lỗi hệ thống chung Ngoại lệ xử lý hệ thống, vui lòng thử lại sau"],
    SYS_ERR_CREATE_FAILED: [1001, "Không thể thêm dữ liệu"],
    SYS_ERR_UPDATE_FAILED: [1002, "Không thể sửa đổi dữ liệu"],
    SYS_ERR_DELETE_FAILED: [1003, "Không thể xóa dữ liệu"],
    SYS_ERR_SEARCH_FAILED: [1004, "Dữ liệu truy vấn không thành công"],
    SYS_ERR_COUNT_FAILED: [1005, "Truy vấn tổng số dữ liệu không thành công"],
    SYS_ERR_DUPLICATED_DATA: [1006, "Dữ liệu đã tồn tại"],
    SYS_ERR_RECORD_NOT_FOUND: [1007, "Dữ liệu không tồn tại"],
    SYS_ERR_CRON: [1008, "lỗi biểu thức cron"],
    SYS_ERR_PRODUCE_CAPTCHA: [1009, "Ngoại lệ tạo mã xác minh"],
    SYS_ERR_TOKEN_SIGNATURE: [1010, "Mã không hợp lệ！"],
    SYS_ERR_REPETITION_SUBMIT: [1011, "Vui lòng không gửi yêu cầu lặp đi lặp lại！"],
    SYS_ERR_TOKEN_EXPIRE: [1012, "Mã thông báo đã hết hạn！"],

    SYS_ERR_HTTP_METHOD_NOT_ALLOWED: [2001, "Phương thức yêu cầu hiện tại không được hỗ trợ，{0}"],
    SYS_ERR_HTTP_UNSUPPORTED_MEDIA_TYPE: [2002, "Loại phương tiện không được hỗ trợ，{0}"],
    SYS_ERR_VALIDATION_MISSING_PARAMS: [3001, "Xác minh thông số yêu cầu không thành công, thông số yêu cầu bị thiếu：{0}"],
    SYS_ERR_VALIDATION_PARAMS_ERROR: [3002, "Yêu cầu xác minh tham số không thành công，{0}"],
    SYS_ERR_VALIDATION_PARAMS_TYPE_ERROR: [3003, "Xác minh tham số yêu cầu không thành công, {0}: loại tham số là {1}"],
    SYS_ERR_VALIDATION_PARAMS_JSON_TYPE_ERROR: [3004, "Xác minh thông số yêu cầu không thành công, {0}: Định dạng JSON không chính xác"],
    SYS_ERR_VALIDATION_BODY_JSON_TYPE_ERROR: [3005, "Việc xác minh tham số yêu cầu không thành công và định dạng JSON của nội dung yêu cầu không chính xác."],
    SYS_ERR_LOGIN_FAIL: [3006, "Đăng nhập không thành công, tên người dùng và mật khẩu không chính xác hoặc tài khoản đã bị vô hiệu hóa!"],
    SYS_ERR_PHONE: [3007, "Lỗi định dạng điện thoại cố định"],
    SYS_ERR_DEL_ACCOUNT: [3010, "Người dùng không thể xóa tài khoản của chính họ！"],
    SYS_ERR_ACCOUNT: [3011, "Tai khoản nay đa được đăng ky！"],
    SYS_ERR_EXPIRE_CAPTCHA: [  3012, "Mã xác minh đã hết hạn！" ],
    SYS_ERR_CAPTCHA: [  3013, "Mã xác minh không chính xác！" ],
    SYS_ERR_PASSWORD_ERROR: [  3014, "Mật khẩu ban đầu được nhập không chính xác！" ],
    SYS_ERR_ROLE_REPETITION: [  3020, "Tên nhân vật trùng lặp！" ],
    SYS_ERR_ROLE_DELETE: [  3021, "Có những người dùng có vai trò này và không thể xóa được!" ],
    SYS_ERR_ENTPR_REPETITION: [  3030, "Tên công ty trùng lặp！" ],
    SYS_ERR_DEPT_REPETITION: [  3040, "Tên bộ phận trùng lặp！" ],
    SYS_ERR_DEPT_DELETE_USER: [  3041, "Có người trong bộ phận này và không thể xóa được!" ],
    SYS_ERR_DEPT_DELETE_CHILD: [  3041, "Bộ phận này là một bộ phận phụ và không thể xóa được!" ],
    SYS_ERR_MENU_CODE_REPETITION: [  3050, "Tên menu trùng lặp hoặc mã cấp phép!" ],
    SYS_ERR_DELETE_MENU: [  3051, "Menu này không thể bị xóa!" ],

    SYS_ERR_JSON: [4000, "Json không hợp lệ !"]

};

class ErrorCodeEnum {
    code = "";
    message = "";

    constructor(dimesions) {
        this.code = dimesions[0];
        this.message = dimesions[1];
    }

    getCode() {
        return this.code;
    }

    getMessage() {
        return this.message;
    }

}

module.exports = {
    ErrorCode,
    ErrorCodeEnum
}

