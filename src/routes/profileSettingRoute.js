
const express = require('express')
const checkToken = require('../controllers/authController')
const { updateInfoUser } = require('../controllers/profileSettingController')
const upload = require('../controllers/uploadController')
const profileSettingRoute = express.Router()



// chỉnh sửa thông tin user
profileSettingRoute.put('/updateInfoUser', checkToken, upload.single("anh_dai_dien"), updateInfoUser)

module.exports = profileSettingRoute