let authModel = require('../models/authschema')


const userAddBasicDetails = async (req, res) => {
    var myquery = { _id: req.body._id };
    var newvalues = {
        $set:
        {
            age: req.body.age,
            heightInFt: req.body.heightInFt,
            weightInKg: req.body.weightInKg,
            bodyType: req.body.bodyType,
            goal: req.body.goal,
        }
    };
    var checkUpdate = await authModel.updateOne(myquery, newvalues)
    if (checkUpdate.matchedCount) {
        res.status(200).send({ message: 'Update Successfully' });
    } else {
        res.status(400).send({ message: 'Updated failed' });
    }
}

const getUserData = async (req, res) => {
    var myquery = { _id: req.param("_id") };
    console.log(myquery)
    await authModel.findOne(myquery).then((responce) => {
        res.status(200).send({ message: 'get user data successfully', data: responce })
    }).catch((err) => {
        res.status(400).send({ message: 'Fetched Failed', error: err })
    })
}

module.exports = { userAddBasicDetails, getUserData }