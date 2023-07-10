const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
const data_exporter = require('json2csv').Parser;
const fs = require('fs');
const path = require('path');

class Spin00601XuatCsvProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async xuatcsv(data,session) {
        return this.execute(this.database,data,session);
    }

    searchParam(data) {
        let filters = data;
        let gt = "01/01/1970";
        let lt = "01/01/2100";
        let sreach = {};
        if(filters.ngaybatdau) {
            gt = filters.ngaybatdau;
        }
        if(filters.ngayketthuc) {
            lt = filters.ngayketthuc;
        }
        sreach.ngaynhap = {$gte:gt,$lt:lt};
        if(filters.soID) {
            sreach.soID = filters.soID;
        }
        if(filters.iduser) {
            sreach.iduser = ObjectId(filters.iduser);
        }
        if(filters.makho) {
            sreach.makho = filters.makho;
        }
        sreach.status02 = 0;
        sreach.idchuyen = null;
        return sreach; 
    }

    async process(db, data, session) {
        let search = this.searchParam(data);
        let json = []
        const PNH = db.models.phieunhaphang;
        let allData = await PNH.find(search)
        .populate("iduser",{password:0});
        allData.forEach(element => {
            let row = {
                soID : element['soID'],
                trangthai: "hahahahah",
                nguoigui: "hahahahah",
                tiencuoc: "hahahahah",
                kho: "hahahahah",
                tenhang: "hahahahah",
                soluong: "hahahahah",
                khoiluong: "hahahahah",
                trongluong: "hahahahah"
            }
            json.push(row);
        });

        let file_header = ['Số ID','Trạng thái' ,"Ngưởi gửi", "Tiền cước", "Kho", "Tên hàng", 'Số lượng' , 'khối lượng', 'Trọng lượng'];
        let json_data = new data_exporter({file_header});
        let csv_data = json_data.parse(json);
        return csv_data;
    }

    // Hàm để tạo tên file dựa trên ngày giờ hiện tại
    generateFileName() {
        const currentDate = new Date();
        const formattedDate = 'BaoCaoTonKho_' + currentDate.toISOString().replace(/[-T:]/g, '').slice(0, 14);
        return `${formattedDate}.csv`;
    }

    saveFileCSV(csvData , fs) {
        const fileName = this.generateFileName();
        const filePath = path.join('/public/csv', fileName);
        fs.writeFile(filePath, csvData, (error) => {
            if (error) {
              console.error('Lỗi khi lưu file CSV:', error);
            } else {
              console.log('File CSV đã được lưu thành công.');
            }
        });
    }
}

module.exports = Spin00601XuatCsvProcess