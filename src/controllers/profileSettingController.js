
const { Sequelize, where } = require('sequelize')
const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const { successCode, failCode, errorCode } = require('../config/response')
const { decodeToken } = require('../config/jwt')
const bcrypt = require('bcrypt')


const model = initModels(sequelize)

const Op = Sequelize.Op

const fs = require('fs')


const updateInfoUser = async (req, res) => {
    const file = req.file
    let { token } = req.headers
    let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id
    let { ho_ten, email, mat_khau, tuoi } = req.body
    let anh_dai_dien = file.filename
    let modelUser = {
        nguoi_dung_id,
        ho_ten,
        email,
        mat_khau: bcrypt.hashSync(mat_khau, 10),
        tuoi,
        anh_dai_dien
    }

    try {
        await model.nguoi_dung.update(modelUser,
            { where: { nguoi_dung_id } },
        )
        successCode(res, modelUser, "Thay đổi thông tin thành công!")
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }

}

module.exports = { updateInfoUser }