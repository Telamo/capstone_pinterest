
const { Sequelize, where } = require('sequelize')
const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const { successCode, failCode, errorCode } = require('../config/response')
const bcrypt = require('bcrypt')
const { generateToken, decodeToken } = require('../config/jwt')
const model = initModels(sequelize)

const fs = require('fs')
const Op = Sequelize.Op



const signUp = async (req, res) => {
    try {
        let { email, mat_khau, ho_ten, tuoi } = req.body

        let modelUser = {
            email,
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            ho_ten,
            tuoi
        }

        let checkEmail = await model.nguoi_dung.findOne({
            where: { email }
        })
        if (checkEmail) {
            failCode(res, modelUser, "Email đã tồn tại !")
        } else {
            await model.nguoi_dung.create(modelUser)
            successCode(res, modelUser, "Đăng ký thành công")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}

const logIn = async (req, res) => {
    try {
        //lấy từ FE
        let { email, mat_khau } = req.body;

        let checkEmail = await model.nguoi_dung.findOne({
            where: { email }
        })
        if (checkEmail) {

            //kiểm tra dữ liệu thô và dữ liệu đã mã hóa
            let checkPass = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);

            if (checkPass) {
                let token = generateToken({ data: { ...checkEmail.dataValues, mat_khau: "" } })
                successCode(res, token, "Login thành công");
            } else {
                failCode(res, "", "Mật khẩu không đúng !");

            }
        } else {
            failCode(res, "", "Email không đúng !");
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi BE")
    }
}

module.exports = {
    logIn,
    signUp
}