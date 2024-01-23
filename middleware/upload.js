const path = require('path')
const multer = require('multer')
const { callbackify } = require('util')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        var key 
        cb(null, Date.now() + ext)
    }
})
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png") {
            cb(null, true)
        } else {
            console.log(file.mimetype)
        }
    }
})
module.exports = {upload}