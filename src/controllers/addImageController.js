
const { Sequelize, where } = require('sequelize')
const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const { successCode, failCode, errorCode } = require('../config/response')
const { generateToken, decodeToken } = require('../config/jwt')
const model = initModels(sequelize)

const bcrypt = require('bcrypt')
const fs = require('fs')
const Op = Sequelize.Op



const uploadImage = async (req, res) => {
    const file = req.file
    let { token } = req.headers
    let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id
    let { ten_hinh, mo_ta } = req.body
    let duong_dan = file.filename

    try {
        const createImage = await model.hinh_anh.create({
            ten_hinh, duong_dan, mo_ta, nguoi_dung_id
        })
        successCode(res, createImage, "Thêm ảnh thành công")
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}


module.exports = {
    uploadImage
}