const { dateNow } = require("../../common/functionCommon");
const Result = require("../../common/result/Result");
const PdfReportProcess = require("./process/pdfReportProcess");


class ReportController {

    async inbaogiaReport(req, res) {
        const dataReport = req.body.order;
        const headerReport = dataReport.tot020_ordhed;
        const listDetail = headerReport.tot040_orddtls;
        const data = {
            pathFile:'../template/bangbaogia/',
            filename: 'order.template.ejs',
            rowsPerPage: 16, // số lượng row trng các page 
            firstPageRows: 12, // số lượng row trong page đầu tiên
            title: 'BẢNG BÁO GIÁ',
            content: {
                company: 'CÔNG TY TNHH GIẢI PHÁP PHẦN MỀN & THIẾT BỊ ĐIỆN TỬ HIPC',
                masothue: "3301680555",
                baogia:"Đoàn Thành Long - 0934.92.92.88",
                hotline: "0898.92.92.88",
                diachi: "05 Lâm Hoàng, P.Vĩ Dạ, TP. Huế",
            },
            header: headerReport,
            now: dateNow(),
            rows: listDetail,
        };
        console.log({msg:"du lieu gui len template", data: data});
        const result = new PdfReportProcess();
        await result.init(data);
        if(result.pdfBuffer) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=combined.pdf');
            res.send(result.pdfBuffer);
        } else {
            res.send(Result.failure())
        }
       
    }

}

module.exports = new ReportController();