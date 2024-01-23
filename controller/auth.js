const brcypt = require('bcryptjs')
let authModel = require('../models/authschema')



const signUp = async (req, res) => {
    // res.send('signin API');
    // console.log(req.body);

    var checkUser = await authModel.findOne({ email: req.body.email })
    // var checkUser = await authModel.deleteOne({ email:req.body.email})
    // res.send({result:checkUser});
    if (checkUser) {
        res.status(200).send({ result: checkUser, message: 'Email already Registered' });
    } else {
        let userCreate = new authModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone_no: req.body.phone_no,
            joindate: Date(),
            isUser: req.body.isUser,
        })
        userCreate.save()
            .then((responce) => {
                res.status(200).send({ result: responce, message: "User Sign Up Successfully" })
                // console.log(responce, "responce success")
            }).catch((err) => {
                res.status(400).send({ result: err.message, message: "Data Not Stored Successfully" })
                // console.log(err, "err")
            })
    }
}


const signIn = async (req, res) => {
    var checkUser = await authModel.findOne({ email: req.body.email })
    if (checkUser) {
        // res.status(200).send({result:checkUser,message:'Login Successfully'});
        // var checkPass = await brcypt.compare(req.body.password,checkUser.password)
        // res.send(checkPass) ///Pass true and false
        if (req.body.password == checkUser.password) {
            console.log(checkUser)
            res.status(200).send({ result: checkUser, message: "Your are sign in successfully" })
        } else {
            res.status(400).send({ result: checkUser, message: "Your Password is incorrect" })
        }
    } else {
        res.status(400).send({ result: checkUser, message: 'Not User is registered with this Email' });
    }
}

const delUser = async (req, res) => {
    // var checkUser = await authModel.deleteOne({ email:req.body.email})
    console.log(req.param("_id"))
    var checkUser = await authModel.deleteOne({ email: req.param("_id") }).catch((e) => console.log(e))
    if (checkUser.deletedCount == 1) {
        res.status(200).send({ result: checkUser, message: 'Deleted Successfully' });
    } else {
        res.status(400).send({ result: checkUser, message: 'Account not found' });
    }
}

module.exports = { signUp, signIn, delUser }