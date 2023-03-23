
const { Sequelize, where } = require('sequelize')
const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const { successCode, failCode, errorCode } = require('../config/response')
const bcrypt = require('bcrypt')
const { generateToken, decodeToken } = require('../config/jwt')
const model = initModels(sequelize)

const fs = require('fs')
const Op = Sequelize.Op



const getImageDetail = async (req, res) => {
    try {
        let { hinh_id } = req.params
        let data = await model.hinh_anh.findAll({
            where: { hinh_id },
            include: [{
                model: model.nguoi_dung,
                as: 'nguoi_dung',
                attributes: { exclude: ['mat_khau', 'email'] } // ẩn mật khẩu và email của người dùng
            }]
        })
        if (data.length > 0) {
            successCode(res, data, "Lấy thông tin thành công!")
        } else {
            failCode(res, "", "ID ảnh không tồn tại!")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}

const getCommentById = async (req, res) => {
    try {
        let { hinh_id } = req.params
        let hinhAnh = await model.hinh_anh.findOne({where: {hinh_id}})
        if(hinhAnh) {
            let data = await model.binh_luan.findAll({
                where: { hinh_id },
                include: [{
                    model: model.nguoi_dung,
                    as: 'nguoi_dung',
                    attributes: { exclude: ['mat_khau', 'email'] } // ẩn mật khẩu và email của người dùng
                }]
            })
            if (data.length > 0) {
                successCode(res, data, "Lấy bình luận thành công!")
            } else {
                failCode(res, "", "Hình ảnh không có bình luận nào!")
            }
        } else {
            failCode(res, "", "id ảnh không tồn tại!")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}


const getSavedImage = async (req, res) => {
    try {
        let { token } = req.headers
        let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id

        let { hinh_id } = req.params
        let hinhAnh = await model.hinh_anh.findOne({ where: { hinh_id } })
        if (hinhAnh) {
            let data = await model.luu_anh.findOne({
                where: {
                    nguoi_dung_id,
                    hinh_id
                }
            })
            if (data) {
                successCode(res, data, "Đã lưu ảnh!")
            } else {
                failCode(res, "", "Hình ảnh chưa được lưu")
            }
        } else {
            failCode(res, "", "id hình ảnh không tồn tại!")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}

const saveComment = async (req, res) => {
    let { token } = req.headers
    let nguoi_dung_id = decodeToken(token).data.nguoi_dung_id
    let { hinh_id, noi_dung } = req.body
    let ngay_binh_luan = new Date()

    try {
        let hinhAnh = await model.hinh_anh.findOne({
            where: { hinh_id }
        })
        if (hinhAnh) {
            const comment = await model.binh_luan.create({ nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung })
            successCode(res, comment, "Đã thêm bình luận")
        } else {
            failCode(res, "", "id hình không tồn tại!")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }

}

module.exports = {
    getImageDetail,
    getCommentById,
    getSavedImage,
    saveComment
}