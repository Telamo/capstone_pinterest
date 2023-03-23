
const express = require('express')
const rootRoute = express.Router()

const authUserRoute = require('./authUserRoute')
const homePageRoute = require('./homePageRoute')
const detailPageRoute = require('./detailPageRoute')
const imageManagementRoute = require('./imageManagementRoute')
const profileSettingRoute = require('./profileSettingRoute')
const addImageRoute = require('./addImageRoute')



// trang xác thực user
rootRoute.use('/authUser', authUserRoute)

// trang chủ
rootRoute.use('/homePage', homePageRoute)

// trang quản lý ảnh
rootRoute.use('/imageManagement', imageManagementRoute)


// trang chi tiết
rootRoute.use('/detailPage', detailPageRoute)


// trang chỉnh sửa thông tin user
rootRoute.use('/profileSetting', profileSettingRoute)

// trang thêm ảnh
rootRoute.use('/addImage', addImageRoute)






module.exports = rootRoute