const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
first:String,
Email:String,
PassWord:String
})
const User=mongoose.model("User",UserSchema)
module.exports=User