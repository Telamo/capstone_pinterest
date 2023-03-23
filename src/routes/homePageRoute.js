
const express = require('express')
const checkToken = require('../controllers/authController')
const { getListImage, getListImageByName } = require('../controllers/homePageController')
const homePageRoute = express.Router()



// GET danh sách ảnh
homePageRoute.get('/getListImage',checkToken, getListImage)

// GET tìm kiếm danh sách ảnh theo tên
homePageRoute.get('/getListImageByName/:ten_hinh', checkToken, getListImageByName)

module.exports = homePageRoute