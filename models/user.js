const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,//complement1 :username and password are added by default by the passport local mongoose
    },
});

//below line is used to impemnet the complement1
userSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model('User',userSchema);