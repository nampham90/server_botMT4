function Response(code,msg,data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}
 
// now we export the class, so other modules can create Cat objects
module.exports = {
    Response: Response
}