const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
const data_exporter = require('json2csv').Parser;
const fs = require('fs');
const path = require('path');
const { now } = require("lodash");

class Spin00601XuatCsvProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async xuatcsv(data,session) {
        return this.execute(this.database,data,session);
    }

    searchParam(data) {
        let filters = data.filters;
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
        let search = this.searchParam(data.body);
        let json = []
        const PNH = db.models.phieunhaphang;
        const USER = db.models.user;
        let allData = await PNH.find(search)
        .populate("iduser",{password:0});
        let u = await USER.findOne({_id: ObjectId(data.userID)});
        allData.forEach(element => {
            let row = {
                "SoID" : element['soID'],
                "NgayNhap": element['ngaynhap'],
                "TenHang" : element['tenhang'],
                "SoLuong": element['soluong'],
                "KhoiLuong": element['khoiluong']+"",
                "TrongLuong": element['trongluong']+"",
                "TrangThai": "Ton Kho",
                "DonViTinh": element['donvitinh'],
                "TonHienTai": element['soluong'],
                "TrongLuongTon": element['trongluong']+"",
                "NguoiBanHanh": u['name'],
                "KhuVuc": element['makho'],
                "NguoiNhan": element['tennguoinhan'],
                "DiaChiNhan": element['diachinguoinhan'],
                "SDTNguoiNhan": element['sdtnguoinhan'],
                "GhiChu": element['ghichu']
            }
            json.push(row);
        });
        if(json.length == 0) {
            return null;
        }
        let file_header = ['Số ID','Trạng thái','Khách hàng','Tiền cước','Kho','Tên hàng','Số lượng','khối lượng','Trọng lượng']
        let json_data = new data_exporter({file_header});
        let csv_data = json_data.parse(json);
        const fileName = this.generateFileName();
        this.saveFileCSV(fileName,csv_data,data.userID,db,session);
        let response = {
            "fileName": fileName,
            "csv_data": csv_data
        }
        return response;
    }

    // Hàm để tạo tên file dựa trên ngày giờ hiện tại
    generateFileName() {
        const currentDate = new Date();
        const formattedDate = 'BaoCaoTonKho_' + currentDate.toISOString().replace(/[-T:]/g, '').slice(0, 14);
        return `${formattedDate}.csv`;
    }

    async saveFileCSV(fileName,csvData,userID,db,session) {
        const TMT010 = db.models.tmt010_filecsv;
        const filePath = path.join('public/csv/', fileName);
        fs.writeFile(filePath, csvData, async (error) => {
            if (error) {
              console.error('Lỗi khi lưu file CSV:', error);
            } else {
                // insert vao database
              const fileinfo = this.getFileInfo(filePath);
              let filesize = 0;
              let typefile = "";

              if(fileinfo) {
                  filesize = fileinfo.size;
                  typefile = fileinfo.type;
              }

              let newTmt010 = new TMT010({
                userID: ObjectId(userID),
                opedatetime: now(),
                filename: fileName,
                filetype: typefile,
                path: filePath,
                sizefile: filesize,
                strrsrv1: "Xuat Ton Kho", 
                strrsrv2: "", 
                strrsrv3: "", 
                strrsrv4: "",
                strrsrv5: "",
                strrsrv6: "",
                strrsrv7: "",
                strrsrv8: "",
                strrsrv9: "",
                strrsrv10: ""
              })
              let rs = await TMT010.collection.insertOne(newTmt010,session);
              console.log('File CSV đã được lưu thành công.');
            }
        });
    }

    // Hàm để lấy thông tin về kích thước và loại file
    getFileInfo(filePath) {
        try {
            const stats = fs.statSync(filePath);
            const fileSize = stats.size;
            const fileType = path.extname(filePath).toLowerCase();
        
            return {
                size: fileSize,
                type: fileType
            };
        } catch (error) {
            console.error('Lỗi khi lấy thông tin file:', error);
            return null;
        }
    }
}

module.exports = Spin00601XuatCsvProcess