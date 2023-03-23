
const express = require('express')
const { uploadImage } = require('../controllers/addImageController')
const checkToken = require('../controllers/authController')
const addImageRoute = express.Router()
const upload = require('../controllers/uploadController')



// thêm 1 ảnh của user
addImageRoute.post('/uploadImage', checkToken, upload.single("image"), uploadImage)


module.exports = addImageRoute