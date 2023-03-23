
// yarn add multer
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // là nơi định nghĩa đường dẫn lưu hình
        cb(null, process.cwd() + "/public/img");
    },
    // giúp đổi tên file đang được up lên
    filename: (req, file, cb) => {
        const newfileName = Date.now() + "-" + file.originalname; // "1676034070279-hinh.xxx"
        cb(null, newfileName);
    }
})
const upload = multer({ storage });

module.exports = upload;