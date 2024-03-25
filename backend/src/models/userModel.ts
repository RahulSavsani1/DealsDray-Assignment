import { timeStamp } from "console";
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    f_Sno: {type:Number,default:""},
    f_UserName: {type:String,required: true},
    f_Email: {type:String,required: true},
    f_Pwd: {type:String,required: true},
},{
    timestamps:true
})

const UserModel = mongoose.model('user', userSchema)
export default UserModel;