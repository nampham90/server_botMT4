const puppeteer = require('puppeteer');
const ejs = require('ejs');
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');

class PdfReportProcess {
    constructor() {
        this.pdfBuffer = null;
    }

    async init(reqData) {
        try {
          this.pdfBuffer = await this.generatePDF(reqData);
        } catch (error) {
          console.log(error);
        }
    }


    generatePDF = async (dataPage) => {
        const { title, now, header ,content, pathFile, filename } = dataPage;
        let pathfile = path.join(__dirname, pathFile) //'./template/order/'
        console.log({msg: "link file", data: pathfile});
        const ejsTemplate = await fs.readFile(pathfile + filename, 'utf-8');
        console.log({msg: 'read template', data: ejsTemplate});
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        // tông page
        const totalPages = await page.evaluate(async (dataPage) => {
            const { rows ,rowsPerPage, firstPageRows} = dataPage;
            // Tính toán số lượng trang
            const totalBooks = rows.length;
            if(totalBooks < firstPageRows) return 1;
            const totalPages = Math.ceil((totalBooks - firstPageRows) / (rowsPerPage - firstPageRows));
            return totalPages;
        }, dataPage);

        let pdfBuffers = [];
        for (let currentPage  = 1; currentPage  <= totalPages; currentPage ++) {
            const booksForCurrentPage = await page.evaluate(async (dataPage, currentPage) => {
                const { rows ,rowsPerPage, firstPageRows} = dataPage;
            
                // Lấy số lượng sách cần cho trang hiện tại
                const rowsForCurrentPage = currentPage === 1 ? firstPageRows : rowsPerPage;
            
                // Lấy sách cần cho trang hiện tại
                const startIndex = (currentPage - 1) * (rowsPerPage - firstPageRows);
                const endIndex = startIndex + rowsForCurrentPage;
                const booksForCurrentPage = rows.slice(startIndex, endIndex);
            
                return booksForCurrentPage;
              }, dataPage, currentPage);
            
              // Ở đây bạn có thể sử dụng booksForCurrentPage cho mỗi trang
            
              
            const data = {
                logo: '/public/img/logo_hipc.jpg',
                pageNum: currentPage, // page hiện tại
                pageSize: totalPages, // tông số lương page
                title:  title, // titile là chuổi string
                content: content,  // content là một object 
                now: now, // ngày giờ hiện tại
                header: header, // phần data header
                rows: booksForCurrentPage // phần data list
                // ... thêm các trường dữ liệu khác cần thiết
            };
            const htmlContent = ejs.render(ejsTemplate, data);
            await page.setContent(htmlContent);
            const pdfBuffer = await page.pdf();
            pdfBuffers.push(pdfBuffer);
        }

        const combinedBuffer  = await this.combinePDFs(pdfBuffers);
        const bufferData = Buffer.from(combinedBuffer);
        
    
        // Đóng trình duyệt
        await browser.close();
        return bufferData;

    }

    combinePDFs = async (pdfBuffers) => {
        const pdfDoc = await PDFDocument.create();
        for (const pdfBuffer of pdfBuffers) {
            const externalDoc = await PDFDocument.load(pdfBuffer);
            const externalPages = await pdfDoc.copyPages(externalDoc, externalDoc.getPageIndices());
            externalPages.forEach((page) => pdfDoc.addPage(page));
          }
      
          const combinedBuffer = await pdfDoc.save();
          return combinedBuffer;
    }



}

module.exports = PdfReportProcess;