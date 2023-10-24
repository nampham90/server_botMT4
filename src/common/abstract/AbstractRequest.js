class AbstractRequest {
  constructor(req) {
    this.lang = req.lang;
    this.userId = req.userId;
    this.pageNum = req.body.pageNum || 1;
    this.pageSize = req.body.pageSize || 10;
    if (this.pageNum === 0) this.pageNum = 1;
  }
}

module.exports = AbstractRequest;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   