let courseModel = require('../models/courseschema')
let videoSchema = require('../models/videoSchema')


const addCourse = async (req, res) => {
    let userCreate = new courseModel({
        introVideo: req.body.introVideo,
        title: req.body.title,
        price: req.body.price,
        trainerId: req.body.trainerId,
        CreateDate: Date(),
        discountedPrice: req.body.discountedPrice,
        // purchaserId: { type: Array },
        profile: req.body.profile,
        trainerName: req.body.trainerName,
        duration: req.body.duration,
        desc: req.body.desc,
        rating: req.body.rating,
        totalSales: req.body.totalSales,
        // videoList: { type: Array },
        totalRated: req.body.totalRated,
    })
    console.log(userCreate)
    userCreate.save()
        .then((responce) => {
            res.status(200).send({ result: responce, message: "Add Course Successfully" })
        }).catch((err) => {
            res.status(400).send({ result: err.message, message: "Data Not Stored Successfully" })
        })
}
const getCourse = async (req, res) => {
    var courseData = await courseModel.find()
    if (courseData) {


        res.status(200).send({ result: courseData, message: "get all course successfully" })

    } else {
        res.status(400).send({ message: 'faild' });
    }
}
const getBuyedCourse = async (req, res) => {
    var courseData = await courseModel.find({ purchaserId: req.param("purchaserId") })
    // grades: { $elemMatch: { grade: { $lte: 90 }, mean: { $gt: 80 } } }
    if (courseData) {
        res.status(200).send({ result: courseData, message: "get all Buyed course successfully" })

    } else {
        res.status(400).send({ message: 'faild' });
    }
}
const buyCourse = async (req, res) => {
    try {
        const courseId = req.body._id;
        const userId = req.body.userId;
        const totalSales = parseInt(req.body.totalSales); // Explicitly convert to integer

        if (isNaN(totalSales) || !isFinite(totalSales)) {
            // If totalSales is not a valid number, handle the error
            return res.status(400).send({ message: 'Invalid totalSales value' });
        }

        // Debugging: Log the parsed totalSales value
        console.log('Parsed totalSales:', totalSales);

        // Update the document directly using updateOne
        const result = await courseModel.updateOne(
            { _id: courseId },
            {
                $addToSet: { purchaserId: userId }, // Using $addToSet to avoid duplicates
                $inc: { totalSales: totalSales }, // Increment totalSales
            }
        );

        if (result.matchedCount) {
            res.status(200).send({ message: 'Buy course successfully' });
        } else {
            res.status(400).send({ message: 'Course buying failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};



const addCourseVideo = async (req, res) => {
    try {
        const courseId = req.body._id;
        const groupTitle = req.body.groupTitle;

        // Check if the document with the given _id exists
        const existingCourse = await courseModel.findOne({ _id: courseId });

        if (existingCourse) {
            console.log(" // Check if the groupTitle exists in the videoList array (case-insensitive)")
            const existingGroupIndex = existingCourse.videoList.findIndex(videoGroup => videoGroup.groupTitle.toLowerCase() === groupTitle.toLowerCase());

            if (existingGroupIndex !== -1) {
                console.log("// GroupTitle exists, add the new video data to the video array")
                // existingCourse.videoList[existingGroupIndex].video.push({
                //     title: req.body.title,
                //     duration: req.body.duration,
                //     videoUrl: req.file.path,
                // });
                // console.log(existingCourse.videoList[2])

                // Use Mongoose update methods to directly update the array in the database
                const updateQuery = {
                    $push: {
                        'videoList.$.video': {
                            title: req.body.title,
                            duration: req.body.duration,
                            videoUrl: req.file.path,
                        }
                    }
                };

                const updateOptions = { arrayFilters: [{ 'videoGroup.groupTitle': groupTitle }] };

                const checkUpdate = await courseModel.updateOne({ _id: courseId, 'videoList.groupTitle': groupTitle }, updateQuery, updateOptions);

                if (checkUpdate.modifiedCount) {
                    res.status(200).send({ message: 'Add Video successfully' });
                } else {
                    res.status(400).send({ message: 'Add Video failed' });
                }
            } else {
                console.log(" // GroupTitle doesn't exist, add a new entry in the videoList array")
                existingCourse.videoList.push({
                    groupTitle: groupTitle,
                    video: [{
                        title: req.body.title,
                        duration: req.body.duration,
                        videoUrl: req.file.path,
                    }],
                });
            }

            // Save the updated document
            await existingCourse.save();

            res.status(200).send({ message: 'Add Video successfully' });
        } else {
            res.status(400).send({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


// const addCourseVideo = async (req, res) => {
//     try {
//         const courseId = req.body._id;
//         const groupTitle = req.body.groupTitle;

//         // Check if the document with the given _id exists
//         const existingCourse = await courseModel.findOne({ _id: courseId });

//         if (existingCourse) {
//             console.log("Check if the groupTitle exists in the videoList array")
//             const existingGroup = existingCourse.videoList.find(videoGroup => videoGroup.groupTitle.toLowerCase() === groupTitle.toLowerCase());
//             if (existingGroup) {
//                 console.log( "GroupTitle exists, add the new video data to the video array")
//                 existingGroup.video.push({
//                     title: req.body.title,
//                     duration: req.body.duration,
//                     videoUrl: req.file.path,
//                 });
//             } else {
//                 console.log( "GroupTitle doesn't exist, add a new entry in the videoList array")
//                 existingCourse.videoList.push({
//                     groupTitle: groupTitle,
//                     video: [{
//                         title: req.body.title,
//                         duration: req.body.duration,
//                         videoUrl: req.file.path,
//                     }],
//                 });
//             }
//             console.log(existingCourse)

//             // Save the updated document
//             await existingCourse.save();

//             res.status(200).send({ message: 'Add Video successfully' });
//         } else {
//             res.status(400).send({ message: 'Course not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// };


const delCourse = async (req, res) => {
    var checkUser = await courseModel.deleteOne({ _id: req.param("_id") }).catch((e) => console.log(e))
    if (checkUser.deletedCount == 1) {
        res.status(200).send({ result: checkUser, message: 'Deleted Successfully' });
    } else {
        res.status(400).send({ result: checkUser, message: 'Account not found' });
    }
}



module.exports = { addCourse, delCourse, getCourse, getBuyedCourse, buyCourse, addCourseVideo }