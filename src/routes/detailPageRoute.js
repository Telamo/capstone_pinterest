
const express = require('express')
const { getImageDetail, getCommentById, getSavedImage, saveComment } = require('../controllers/detailPageController')
const detailPageRoute = express.Router()
const checkToken = require('../controllers/authController')



// GET thông tin ảnh và người tạo ảnh bẳng id
detailPageRoute.get('/getImageDetail/:hinh_id', checkToken, getImageDetail)


//GET thông tin bình luận theo id ảnh
detailPageRoute.get('/getCommentById/:hinh_id', checkToken, getCommentById)


// GET thông tin đã lưu ảnh theo id ảnh
detailPageRoute.get('/getSavedImage/:hinh_id', checkToken, getSavedImage)


// POST lưu bình luận của người dùng với ảnh
detailPageRoute.post('/saveComment', checkToken, saveComment)

module.exports = detailPageRoute
