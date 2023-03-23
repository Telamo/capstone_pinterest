
const express = require('express')
const checkToken = require('../controllers/authController')
const { getInfoUser, getImageSaved, listImageCreate, deleteImage } = require('../controllers/imageManagementController')
const imageManagementRoute = express.Router()



// GET thông tin user
imageManagementRoute.get('/getInfoUser', checkToken, getInfoUser)


// GET danh sách ảnh đã lưu theo user id
imageManagementRoute.get('/getImageSaved', checkToken, getImageSaved)


// GET danh sách ảnh đã tạo theo user id
imageManagementRoute.get('/listImageCreate', checkToken, listImageCreate)


// xóa ảnh đã tạo theo id ảnh
imageManagementRoute.delete('/deleteImage/:hinh_id', checkToken, deleteImage)


module.exports = imageManagementRoute