function Response(code,msg,data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

function DataResponse(list,pageNum,pageSize,size,startRow,endRow,pages,prePage,nextPage,isFirstPage,isLastPage,hasPreviousPage,hasNextPage,navigatePages,
    navigatepageNums,navigateFirstPage,navigateLastPage){
    this.total = list.length;
    this.list = list;
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.size = size;
    this.startRow = startRow;
    this.endRow = endRow;
    this.pages = pages;
    this.prePage = prePage;
    this.nextPage = nextPage;
    this.isFirstPage = isFirstPage;
    this.isLastPage = isLastPage;
    this.hasPreviousPage = hasPreviousPage;
    this.hasNextPage = hasNextPage;
    this.navigatePages = navigatePages;
    this.navigatepageNums = navigatepageNums;
    this.navigateFirstPage = navigateFirstPage;
    this.navigateLastPage = navigateLastPage;
}
 
// now we export the class, so other modules can create Cat objects
module.exports = {
    Response: Response,
    DataResponse : DataResponse
}