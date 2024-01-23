const express = require('express');
const router = express.Router();
const { addCourse, delCourse, getCourse, getBuyedCourse, buyCourse, addCourseVideo } = require('../controller/course')
const { upload } = require('../middleware/upload')
// const upload = multer({ dest: './public/data/uploads/' })

router.use('/addCourse', addCourse)
// http://localhost:5000/course/addCourse
// {
//     "introVideo": "req.body.introVideo",
//     "title": "req.body.title",
//     "price": "req.body.price",
//     "trainerId": "req.body.trainerId",
//     "discountedPrice": "req.body.discountedPrice",
//     // purchaserId: { type: Array },
//     "profile": "req.body.profile",
//     "trainerName": "req.body.trainerName",
//     "duration": "req.body.duration",
//     "desc": "req.body.desc",
//     "totalSales": "req.body.totalSales",
//     // videoList: { type: Array },
//     "totalRated": "req.body.totalRated"
// }
router.use('/getCourse', getCourse)
// http://localhost:5000/course/getCourse
router.use('/getBuyedCourse/:purchaserId', getBuyedCourse)
// http://localhost:5000/course/getBuyedCourse/ds
router.use('/buyCourse', buyCourse)
// http://localhost:5000/course/buyCourse
// {
//     "userId": "pk",
//     "totalSales": "req.body.totalSales"
// }
router.use('/delCourse/:_id', delCourse)
// http://localhost:5000/course/delCourse/xyz@gmail.com

router.use('/addCourseVideo', upload.single('videoUrl'), addCourseVideo)
// http://localhost:5000/course/addCourseVideo
// {
//     "_id": "65943b7ba285a626d3175683",
//     "groupTitle": "req.body.groupTitle",
//     "title": "req.body.title",
//     "duration": "req.body.duration",
//     "videoUrl": "req.body.videoUrl"
// }
module.exports = router
