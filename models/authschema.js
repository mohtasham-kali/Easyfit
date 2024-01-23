const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone_no: { type: String },
    joindate: { type: String },
    isUser: { type: Boolean },
    gender: { type: String },
    age: { type: String },
    heightInFt: { type: String },
    weightInKg: { type: String },
    bodyType: { type: String },
    goal: { type: String },
})

const authModel = mongoose.model("authData", authSchema);
module.exports = authModel;