const express = require('express');
const router = express.Router();
const authRouter = require('./authRoute')
const userRouter = require('./userRoute')
const courseRoute = require('./courseRoute')
router.use('/auth',authRouter)
router.use('/user',userRouter)
router.use('/course',courseRoute)



module.exports = router;