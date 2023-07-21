const AbsProcess = require("../abstractProcess/Transaction");
let commonfun = require('../../common/functionCommon');
const { ObjectId } = require('mongodb')
const RegisterCongNoXeNgoaiProcess = require('./registerCongNoXeNgoaiProcess');
class CreateChuyenngoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async create(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const Chuyenngoai = db.models.chuyenngoai;
        let spch00251Header = data.spch00251Header;
        let lstdetail = data.spch00251Listdetail;
        // tạo mã chuyến ngoài. so ODN
        let soODN = await commonfun.fnGetODN();
        let newChuyenngoai = new Chuyenngoai({
            ngaynhap: spch00251Header.ngaynhap,
            ngayvanchuyen: spch00251Header.ngayvanchuyen,
            ngaydukiengiaohang: spch00251Header.ngaydukiengiaohang,
            nguonxe: ObjectId(spch00251Header.nguonxe), // id nguon xe
            soodn: soODN,
            biensoxe: spch00251Header.biensoxe,
            sdtnguonxe: spch00251Header.sdtnguonxe,
            tentaixe: spch00251Header.tentaixe,
            sodienthoai: spch00251Header.sodienthoai,
            listdetail: [],
            status01: 0,
            status02: 0,
            status03: 0,// 
            status04: 0,
            status05: 0,
            ghichu: spch00251Header.ghichu
        });
        let rs = await Chuyenngoai.collection.insertOne(newChuyenngoai,{session});
        if(rs['insertedId']) {
            const Chitietchuyenngoai = db.models.chitietchuyenngoai;
            const Phieunhaphang = db.models.phieunhaphang
            let lstCtcn = []
            for(let element of lstdetail) {
                let newDetail = {
                    idchuyenngoai: ObjectId(rs['insertedId']),
                    soodn: soODN,
                    soID:element.soID,
                    nguonxe: ObjectId(spch00251Header.nguonxe),
                    tenhang: element.tenhang,
                    soluong: element.soluong,
                    trongluong: element.trongluong,
                    khoiluong: element.khoiluong,
                    donvitinh: element.donvitinh,
                    diadiembochang: element.diadiembochang,  // 
                    tiencuoc:element.tiencuoc,
                    tiencuocxengoai: element.tiencuocxengoai,
                    htttxengoai: element.htttxengoai,
                    idkhachhang: ObjectId(element.idkhachhang),
                    htttkhachhang: element.htttkhachhang,
                    tennguoinhan: element.tennguoinhan,
                    sdtnguoinhan: element.sdtnguoinhan,
                    diachinguoinhan: element.diachinguoinhan,
                    chiphidvtn: element.chiphidvtn,
                    status01: 0, // trang thai don hang. =0 chưa bóc. =1 đã bóc, =2 đã giáo
                    status02: element.status02, // 
                    status03: 0, 
                    status04: 0,
                    status05: 0,
                    ghichu: element.ghichu
                }
                // if soId != "" thì update tiencuoc=0,status02=2 trong phieunhaphang vơi soId trên
                // hành động ngày có nghĩa . khi chuyển hàng cho xe ngoài. thì không tính doanh số. update trạng thái đơn hàng là đã chuyển sang xe ngoài
                await Phieunhaphang.collection.updateOne({soID:soId},{$set:{tiencuoc:0,status02:2}},{session});
                // đang ký công no xe ngoài

                if (element.htttxengoai == "2") {
                    let dataregister = {
                        "nguonxe": spch00251Header.nguonxe,
                        "soID": element.soID,
                        "biensoxe": spch00251Header.biensoxe,
                        "tentaixe" : spch00251Header.tentaixe,
                        "sodienthoai": spch00251Header.sodienthoai,
                        "sotienno" : element.tiencuocxengoai,
                        "status02" : 1,
                        "ghichu" : "NO"
                    }
                    const registerCongNoXeNgoaiProcess = new RegisterCongNoXeNgoaiProcess(this.database);
                    await registerCongNoXeNgoaiProcess.register(dataregister,session);
                } else {
                    let dataregister = {
                        "nguonxe": spch00251Header.nguonxe,
                        "soID": element.soID,
                        "biensoxe": spch00251Header.biensoxe,
                        "tentaixe" : spch00251Header.tentaixe,
                        "sodienthoai": spch00251Header.sodienthoai,
                        "sotienno" : element.tiencuocxengoai,
                        "status02" : 0,
                        "ghichu" : "NO"
                    }
                    const registerCongNoXeNgoaiProcess = new RegisterCongNoXeNgoaiProcess(this.database);
                    await registerCongNoXeNgoaiProcess.register(dataregister,session);
                }
                lstCtcn.push(newDetail);
            }
            await Chitietchuyenngoai.collection.insertMany(lstCtcn, { session });
        }
    }
}

module.exports = CreateChuyenngoaiProcess;