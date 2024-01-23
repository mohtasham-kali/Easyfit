const express = require('express');
const router = express.Router();
const { userAddBasicDetails, getUserData } = require('../controller/user')
router.use('/userAddBasicDetails', userAddBasicDetails)
// http://localhost:5000/user/userAddBasicDetails
// {
//     "_id": "65902b2d8df4c685f31bd9c5",
//     "age": "65",
//     "bodyType": "skinny",
//     "goal": "weight loose",
//     "heightInFt": "5.5",
//     "weightInKg": "55"
// }
router.use('/getUserData/:_id', getUserData)
// http://localhost:5000/auth/getUserData/65902b2d8df4c685f31bd9c5
module.exports = router
