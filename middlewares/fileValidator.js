const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileValidator = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Địa chỉ thư mục lưu trữ
      const uploadPath = 'public/uploads/';

      // Tạo thư mục lưu trữ nếu không tồn tại
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Đặt tên file
      const timestamp = Date.now();
      const originalName = file.originalname;
      const extname = path.extname(originalName);
      const fileName = `${timestamp}${extname}`;

      cb(null, fileName);
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedFileTypes = /jpeg|jpg|png/;
      const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedFileTypes.test(file.mimetype);

      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb('Error: Invalid file type');
      }
    }
  }).single('file');

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileInformation = {
      filename: file.filename,
      path: file.destination + file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };

    req.fileInformation = fileInformation;

    next();
  });
};

module.exports = fileValidator;