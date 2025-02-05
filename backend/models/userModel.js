const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
    address: String, // Added address field
    phone: String,
    shippingDetails: {
        recipientName: String,
        address: String,
        city: String,
        state: String,
        country: String,
        phone: String,
    },
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel