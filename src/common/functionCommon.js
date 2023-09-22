
const db = require('../model');
const _ = require('lodash');
let Responses = require('../common/response');
const dotenv = require('dotenv');
dotenv.config();
const User = db.user;
const Xe = db.xe;
const Nhatkykh = db.nhatkykh;
const Pnh = db.phieunhaphang;
const Cpc = db.chiphichuyenxe;
const Nkht = db.nhatkyhethong;
const Chuyen = db.chuyen;
const Message = db.message;
//master
const Tmt100 = db.tmt100;

let DataResponse = Responses.DataResponse;

exports.checkStrId = (str) => {
   return str.length === 24;
}
exports.dataReponse = (allData,data,pageNum,pageSize) =>{
    if(pageNum == 0 && pageSize == 0 || data.length == 0) {
        let datares =new DataResponse(allData,allData,pageNum,pageSize,
            data.length,1,data.length,0,0,0,false,true,false,false,0,[],0,0);
        return datares;
    }else{
        let total = allData.length;
        let pages =getPages(total,pageSize);
        let endRow = getEndrow(total,pageNum,pageSize,pages);
        let hasNextPage = gethasNextPage(total,pageNum,pageSize,pages);
        let hasPreviousPage = gethasPreviousPage(pages);
        let isFirstPage = getisFirstPage(pageNum,pages);
        let isLastPage = getisLastPage(pages);
        let navigateFirstPage = 1;
        let navigateLastPage = pages;
        let navigatePages = 8;
        let navigatepageNums = getnavigatePages(pages);
        let nextPage = getnextPage(pageNum,pages);

        let prePage = pageNum -1;
        let size = getSize(total,pageNum,pageSize,pages);
        let startRow = getstartRow(pageNum,pageSize);

        let datares = new DataResponse(allData,data,pageNum,pageSize,size,startRow,endRow,pages,prePage,nextPage,isFirstPage,
            isLastPage,hasPreviousPage,hasNextPage,navigatePages,navigatepageNums,navigateFirstPage,navigateLastPage);
        return datares;
    }
}

function getstartRow(pageNum,pageSize){
    let startRow;
    if(pageNum == 1) {
        startRow = 1;
    }else {
        startRow = (pageNum * pageSize) - (pageSize-1);
    }
    return startRow;
}

function getSize(total,pageNum,pageSize,pages) {
     let size;
     if(total < pageSize) {
         size = total;
     }else if(pages == pageNum && pages > 1) {
        size = total % pageSize;
     } else {
         size = pageSize;
     }
     return size;
}
function getnextPage(pageNum,pages) {
    let nextPage;
    if(pageNum == pages){
        nextPage = 0;
    }else {
        nextPage = pageNum + 1;
    }
    return nextPage;
}

function getnavigatePages(pages){
    let navigatePages = [];
    for(let i=0;i<pages;i++) {
        navigatePages.push(i+1);
    }
    return navigatePages;
}

function getisLastPage(pages){
    let isLastPage;
    if(pages == 1) {
        isLastPage = false;
    }else {
        isLastPage = true;
    }
    return isLastPage;
}
function getPages(total, pageSize){
   let pages = 0;
   let phan_nguyen = _.floor((total/pageSize));
   if(total % pageSize == 0){
       pages = phan_nguyen;
   }else {
       pages = phan_nguyen + 1;
   }
   return pages;
}

function getEndrow(total,pageNum,pageSize,pages){
    let endRow =0;
    if(pages == 1) {
        endRow = total;
    } else if(pages == pageNum) {
        endRow = total % pageSize;
    }else {
        endRow =pageSize;
    }
    return endRow;
}

function gethasNextPage(total,pageNum,pageSize,pages){
   let hasNextPage;
   if(pages == 1 && total < pageSize) {
       hasNextPage = false;
   } else if(pages == pageNum) {
       hasNextPage = false;
   } else {
       hasNextPage = true;
   }
   return hasNextPage;
}

function gethasPreviousPage(pages){
    let hasPreviousPage;
    if(pages == 1) {
        hasPreviousPage = false;
    } else {
        hasPreviousPage = true;
    }
    return hasPreviousPage;
}

function getisFirstPage(pageNum,pages){
    let isFirstPage;
    if(pages == pageNum) {
        isFirstPage = false;
    }else {
        isFirstPage = true;
    }

    return isFirstPage;
}

// funcon kiem tra và xóa menu ra khỏi danh sách
exports.checkAndremoveIdMenu = async (idUser,idmenu) => {
   let listmenu = [];
   let u = await User.findOne({_id: idUser});
   if(!u) return listmenu;
   listmenu = u.menulist;
   let check = false;
   if(listmenu.length > 0) {
    listmenu.forEach(element => {
        if(element._id == idmenu){
          check = true;
        }
    })
   }
   if(check === true) {
      let newlst = _.remove(listmenu, function(m) {
        return m._id != idmenu;
      });
      return newlst;
   }
   return listmenu;
}
// function kiem tra id menu có trong danh sach hay khong
exports.checkIdMenu = async (idUser,idmenu) => {
    let u = await User.findOne({_id: idUser});
    if(!u) return false;
    let listmenu = u.listmenu;
    let check = false;
    listmenu.forEach(element => {
       if(element._id == idmenu){
         check = true;
       }
    })
    if(check === true) {
       return true;
    }
    return false;
 }



exports.dateNow = () => {
    let date = new Date()
    let nowday = "";
    let day = date.getDate();
    let thang = parseInt(date.getMonth());
    thang = thang + 1;
    let year = date.getFullYear();
    nowday = nowday + "" + year + "-" + thang + "-" + day;
    return nowday;
}
exports.take_decimal_number = (num,n) => {
    let base = 10**n;
    let result = Math.round(num * base) / base ;
    return result;
}

exports.getDateparam = (param) => {
    let date = new Date(param);
    let nowday = "";
    let day = date.getDate();
    let thang = parseInt(date.getMonth());
    thang = thang + 1;
    let year = date.getFullYear();
    nowday = nowday + "" + year + "-" + thang + "-" + day;
    return nowday;
}


// ghi nhật ký hệ thống
exports.ghiNhatkyhethong = async (loaithongbao,noidung,iduser,hanhdong,table) => {
    let nkht = new Nkht({
        loaithongbao: loaithongbao,//notifi | system | vison
        noidung: noidung,
        iduser: iduser, //hệ thông, người dùng
        hanhdong:hanhdong, //update //thêm mới // xóa
        table: table, // bảng thực hiẹn
        ngay: _.now(),// ngày thực hiện. 
        status01: "0", //"0" new. "1" xóa
        status02: "0", // "0" chưa xác nhận , "1" đã xác nhận
        status03: "0",
        status04: "0",
        status05: "0"
    })
    nkht.save( async function(e){
        if(e) {
            return false;
        } else {
            console.log("ghi nhật ký thành công");
            return true;
        }
    })
}


// tìm phần tử nhỏ nhất trong mảng
exports.minElement = (array,field) => {
   let min = array[0];
   let min_index = 0;
   for(let i = 1; i < array.length; ++i) {
     if(min[field] > array[i][field]) {
        min = array[i];
        min_index = i;
     }
   }
   return min_index;
}


// function send email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.sendEmail = (to,from,subject,contenText,contentHtml) => {
    
    let msg = {
        to: to, // Change to your recipient
        from: from, // Change to your verified sender
        subject: subject,
        text: contenText,
        html: contentHtml,
    }
    sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}


// function send message telegram
exports.fnSendMessageTelegram =  (idgroup, content, axios) => {
    let url = process.env.URL_TELEGRAM;
    let token = process.env.TOKEN_TELEGRAM;
    let urlgroupid = process.env.GROUPID_TELEGRAM;
    let urltext = process.env.CONTENT_TELEGRAM;

    let strTelegram = url + token + urlgroupid + idgroup + urltext + content;
    strTelegram = fixedEncodeURI(strTelegram)
    console.log(strTelegram);
    axios.get(strTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});

}

function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

// function get message db
exports.fnGetMessagedb = async (idmsg) => {
    let msg = await Message.findOne({idmsg: idmsg});
    if (msg) {
        return msg.strmsg;
    } else {
        return "";
    }
}

exports.fnGetODS = async () => {
   let soODS = "";
   let ods = await Tmt100.findOne({maghep:"ODS"});
   if(ods) {
      // kiểm số winnumber
      let toWinnumber = _.toNumber(ods['winnumber']);
      let toStartnumber = _.toNumber(ods['startnumber']);
      let toEndnumber = _.toNumber(ods['endnumber']);
      if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
        soODS = "0"//  hêt sô ods
        return soODS;
      }
      let nowday = this.dateNow();
      nowday = nowday.replace(/\s+/g, '');
      nowday = nowday.replace(/-/g, '');
      soODS = ods['maghep'] + nowday + ods['winnumber'];
      // update winnumber mơi. winnuber + 1;

      let newWinnumber = toWinnumber +1;
      await Tmt100.updateOne({maghep:"ODS"},{$set: {winnumber:_.toString(newWinnumber)}})
      return soODS;
   } else {
      soODS = "1";// lỗi hệ thống
      return soODS;
   }
}

exports.fnGetODT = async () => {
    let soODT = "";
    let odt = await Tmt100.findOne({maghep:"ODT"});
    if(odt) {
       // kiểm số winnumber
       let toWinnumber = _.toNumber(odt['winnumber']);
       let toStartnumber = _.toNumber(odt['startnumber']);
       let toEndnumber = _.toNumber(odt['endnumber']);
       if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
        soODT = "0"//  hêt sô odt
        return soODT;
       }
       let nowday = this.dateNow();
       nowday = nowday.replace(/\s+/g, '');
       nowday = nowday.replace(/-/g, '');
       soODT = odt['maghep'] + nowday + odt['winnumber'];
       // update winnumber mơi. winnuber + 1;
       let newWinnumber = toWinnumber +1;
       await Tmt100.updateOne({maghep:"ODT"},{$set: {winnumber:_.toString(newWinnumber)}})
       return soODT;
    } else {
        soODT = "1";// lỗi hệ thống
        return soODT;
    }
}
// mã thanh toán công nợ khach hang
exports.fnGetODC = async () => {
    let soODC = "";
    let odc = await Tmt100.findOne({maghep:"ODC"});
    if(odc) {
       // kiểm số winnumber
       let toWinnumber = _.toNumber(odc['winnumber']);
       let toStartnumber = _.toNumber(odc['startnumber']);
       let toEndnumber = _.toNumber(odc['endnumber']);
       if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
        soODC = "0"//  hêt sô odC
        return soODC;
       }
       let nowday = this.dateNow();
       nowday = nowday.replace(/\s+/g, '');
       nowday = nowday.replace(/-/g, '');
       soODC = odc['maghep'] + nowday + odc['winnumber'];
       // update winnumber mơi. winnuber + 1;
       let newWinnumber = toWinnumber +1;
       await Tmt100.updateOne({maghep:"ODC"},{$set: {winnumber:_.toString(newWinnumber)}})
       return soODC;
    } else {
        soODC = "1";// lỗi hệ thống
        return soODC;
    }
}

// mã thanh toán công nợ xe ngòa
exports.fnGetHDTTXN = async () => {
    let soHDTTXN = "";
    let hdttxn = await Tmt100.findOne({maghep:"HDTTXN"});
    if(hdttxn) {
       // kiểm số winnumber
       let toWinnumber = _.toNumber(hdttxn['winnumber']);
       let toStartnumber = _.toNumber(hdttxn['startnumber']);
       let toEndnumber = _.toNumber(hdttxn['endnumber']);
       if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
        soHDTTXN = "0"//  hêt sô odC
        return soHDTTXN;
       }
       let nowday = this.dateNow();
       nowday = nowday.replace(/\s+/g, '');
       nowday = nowday.replace(/-/g, '');
       soHDTTXN = hdttxn['maghep'] + nowday + hdttxn['winnumber'];
       // update winnumber mơi. winnuber + 1;
       let newWinnumber = toWinnumber +1;
       await Tmt100.updateOne({maghep:"HDTTXN"},{$set: {winnumber:_.toString(newWinnumber)}})
       return soHDTTXN;
    } else {
        soHDTTXN = "1";// lỗi hệ thống
        return soHDTTXN;
    }
}

