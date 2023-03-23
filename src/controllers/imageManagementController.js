
const { Sequelize, where } = require('sequelize')
const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const { successCode, failCode, errorCode } = require('../config/response')
const bcrypt = require('bcrypt')
const { generateToken, decodeToken } = require('../config/jwt')

const fs = require('fs')

const model = initModels(sequelize)

const Op = Sequelize.Op





const getInfoUser = async (req, res) => {
    try {
        let { token } = req.headers
        let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id
        let data = await model.nguoi_dung.findOne({
            where: { nguoi_dung_id }
        })
        if (data) {
            successCode(res, data, "lấy thông tin thành công!")
        } else {
            failCode(res, "", "Người dùng không tồn tại!")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}


const getImageSaved = async (req, res) => {
    try {
        let { token } = req.headers
        let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id
        let data = await model.luu_anh.findAll({
            where: { nguoi_dung_id },
            // include: ["nguoi_dung", "hinh"]
            include: [
                {
                    model: model.nguoi_dung,
                    as: 'nguoi_dung',
                    attributes: { exclude: ['mat_khau', 'email'] }
                },
                {
                    model: model.hinh_anh,
                    as: 'hinh'
                }
            ]
        })
        if (data.length > 0) {
            successCode(res, data, "Lấy thông tin thành công!")
        } else {
            failCode(res, "", "Chưa có hình ảnh nào được lưu")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}


const listImageCreate = async (req, res) => {
    try {
        let { token } = req.headers
        let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id
        let data = await model.hinh_anh.findAll({
            where: { nguoi_dung_id },
            include: [{
                model: model.nguoi_dung,
                as: 'nguoi_dung',
                attributes: { exclude: ['mat_khau', 'email'] }
            }
            ]
        })
        if (data.length > 0) {
            successCode(res, data, "Lấy danh sách thành công!")
        } else {
            failCode(res, "", "chưa có ảnh nào được tạo từ user này!")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }

}


const deleteImage = async (req, res) => {
    let { token } = req.headers
    let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id
    let { hinh_id } = req.params
    try {
        let data = await model.hinh_anh.findOne({
            where: { hinh_id, nguoi_dung_id }
        })
        if (data) {
            await model.hinh_anh.destroy({
                where: { hinh_id, nguoi_dung_id }
            })
            successCode(res, data, "Xóa ảnh thành công!")
        } else {
            failCode(res, "", "ID Ảnh không tồn tại trong danh sách ảnh đã tạo!")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}


module.exports = {
    getInfoUser,
    getImageSaved,
    listImageCreate,
    deleteImage
}