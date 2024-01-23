const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    groupTitle: { type: String },
    video: [{
        title: { type: String },
        duration: { type: String },
        videoUrl: { type: String },
    }],
});

const video = mongoose.model("videoData", videoSchema);
module.exports = video;