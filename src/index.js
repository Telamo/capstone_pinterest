// yarn init
// yarn add express nodemon

// import thư viện express
const express = require('express')
const app = express()
const port = 8080

// middleware chuyển đổi để đọc định dạng json
app.use(express.json())
// định vị thư mục để load tài nguyên
app.use(express.static("."))

// cho phép FE truy cập API từ BE
// yarn add cors
const cors = require('cors');
app.use(cors())

// yarn add multer

// tạo ra 1 host từ thư viện express
app.listen(port, () => {
    console.log('App listening on port: ' + port)
})

const rootRoute = require('./routes/rootRoute')
app.use('/api', rootRoute)
