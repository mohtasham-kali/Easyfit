const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    introVideo: { type: String },
    title: { type: String },
    price: { type: String },
    trainerId: { type: String },
    CreateDate: { type: String },
    discountedPrice: { type: String },
    purchaserId: { type: Array },
    profile: { type: String },
    trainerName: { type: String },
    duration: { type: String },
    desc: { type: String },
    rating: { type: String },
    totalSales: { type: String },
    videoList: { type: Array },
    totalRated: { type: String },
    totalSales: { type: String },
})

const courseModel = mongoose.model("courseData", courseSchema);
module.exports = courseModel;
