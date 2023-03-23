
const { Sequelize, where } = require('sequelize')
const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const { successCode, failCode, errorCode } = require('../config/response')
const bcrypt = require('bcrypt')
const { generateToken, decodeToken } = require('../config/jwt')

const fs = require('fs')

const model = initModels(sequelize)

const Op = Sequelize.Op



const getListImage = async (req, res) => {
    try {
        let data = await model.hinh_anh.findAll()
        successCode(res, data, "Lấy danh sách thành công!")
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}


const getListImageByName = async (req, res) => {
    try {
        let { ten_hinh } = req.params
        let data = await model.hinh_anh.findAll({
            where: {
                ten_hinh: {
                    [Op.like]: `%${ten_hinh}%`
                }
            }
        })
        if (data.length > 0) {
            successCode(res, data, "Lấy danh sách thành công")
        } else {
            failCode(res, "", "Không tìm thấy hình phù hợp")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}

module.exports = {
    getListImage,
    getListImageByName
}