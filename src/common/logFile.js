const fs = require('fs');
const path = require('path');

function logToFile(msg) {
  // Lấy ngày hiện tại
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    const dateStr = `${year}-${month}-${day}`;
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const timeStr = `${hour}:${minute}:${second}`;

    // Tạo tên file dựa trên ngày hiện tại
    const filename = `log-${dateStr}.txt`;

    // Tạo file writable stream
    const logStream = fs.createWriteStream(path.join(__dirname, 'logs', filename), { flags: 'a' });

    // Ghi log vào file
    logStream.write(timeStr+ ": " + msg + '\n');

    // Đóng file writable stream
    logStream.end();
}

module.exports = logToFile;