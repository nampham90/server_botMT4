const Result = require("../../common/result/Result");
const PdfReportProcess = require("./process/pdfReportProcess");


class ReportController {

    async inbaogiaReport(req, res) {
        const data = {
            pathFile:'../template/bangbaogia/',
            filename: 'order.template.ejs',
            rowsPerPage: 16, // số lượng row trng các page 
            firstPageRows: 10, // số lượng row trong page đầu tiên
            title: 'Hello PDF',
            content: 'This is the content of the PDF.',
            rows: [
               
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 50
                },
                {
                    name: 'aa',
                    price: 57777
                },
            ]
        };
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