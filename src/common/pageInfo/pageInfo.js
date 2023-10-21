class PageInfo {
    constructor(totalRows, data, pageNum, pageSize) {
      if (pageNum === 0 && pageSize === 0 || data.length === 0) {
        this.total = totalRows;
        this.list = data;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.size = data.length;
        this.startRow = 0;
        this.endRow = 0;
        this.pages = 1;
        this.prePage = 0;
        this.nextPage = 0;
        this.isFirstPage = false;
        this.isLastPage = true;
        this.hasPreviousPage = false;
        this.hasNextPage = false;
        this.navigatePages = 0;
        this.navigatepageNums = [];
        this.navigateFirstPage = 0;
        this.navigateLastPage = 0;
      } else {
        const total = totalRows;
        const pages = this.getPages(total, pageSize);
        const endRow = this.getEndrow(total, pageNum, pageSize, pages);
        const hasNextPage = this.gethasNextPage(total, pageNum, pageSize, pages);
        const hasPreviousPage = this.gethasPreviousPage(pages);
        const isFirstPage = this.getisFirstPage(pageNum, pages);
        const isLastPage = this.getisLastPage(pages);
        const navigateFirstPage = 1;
        const navigateLastPage = pages;
        const navigatePages = 8;
        const navigatepageNums = this.getnavigatePages(pages);
        const nextPage = this.getnextPage(pageNum, pages);
        const prePage = pageNum - 1;
        const size = this.getSize(total, pageNum, pageSize, pages);
        const startRow = this.getstartRow(pageNum, pageSize);
  
        this.total = total;
        this.list = data;
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
    }
  
    getstartRow(pageNum, pageSize) {
      if (pageNum === 1) {
        return 1;
      } else {
        return pageNum * pageSize - (pageSize - 1);
      }
    }
  
    getSize(total, pageNum, pageSize, pages) {
      if (total < pageSize) {
        return total;
      } else if (pages === pageNum && pages > 1) {
        return total % pageSize;
      } else {
        return pageSize;
      }
    }
  
    getnextPage(pageNum, pages) {
      if (pageNum === pages) {
        return 0;
      } else {
        return pageNum + 1;
      }
    }
  
    getnavigatePages(pages) {
      const navigatePages = [];
      for (let i = 0; i < pages; i++) {
        navigatePages.push(i + 1);
      }
      return navigatePages;
    }
  
    getisLastPage(pages) {
      return pages === 1 ? false : true;
    }
  
    getPages(total, pageSize) {
      let pages = 0;
      const phan_nguyen = Math.floor(total / pageSize);
      if (total % pageSize === 0) {
        pages = phan_nguyen;
      } else {
        pages = phan_nguyen + 1;
      }
      return pages;
    }
  
    getEndrow(total, pageNum, pageSize, pages) {
      let endRow = 0;
      if (pages === 1) {
        endRow = total;
      } else if (pages === pageNum) {
        endRow = total % pageSize;
      } else {
        endRow = pageSize;
      }
      return endRow;
    }
  
    gethasNextPage(total, pageNum, pageSize, pages) {
      if (pages === 1 && total < pageSize) {
        return false;
      } else if (pages === pageNum) {
        return false;
      } else {
        return true;
      }
    }
  
    gethasPreviousPage(pages) {
      return pages === 1 ? false : true;
    }
  
    getisFirstPage(pageNum, pages) {
      return pages === pageNum ? false : true;
    }
}

module.exports = PageInfo;