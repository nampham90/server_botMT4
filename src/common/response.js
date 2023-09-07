function Response(code,msg,data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

function DataResponse(allData,list,pageNum,pageSize,size,startRow,endRow,pages,prePage,nextPage,isFirstPage,isLastPage,hasPreviousPage,hasNextPage,navigatePages,
    navigatepageNums,navigateFirstPage,navigateLastPage){
    this.total = allData.length;
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

function ObjectDataSC(stt,title1,title2,idyoutube) {
    this.stt = stt;
    this.title1 = title1;
    this.title2 = title2;
    this.idyoutube = idyoutube
}
 
// now we export the class, so other modules can create Cat objects
module.exports = {
    Response: Response,
    DataResponse: DataResponse,
    ObjectDataSC: ObjectDataSC
}