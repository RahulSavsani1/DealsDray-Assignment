import mongoose from "mongoose"

const employeSchema = new mongoose.Schema({
    f_Id: {type:Number,required: true},
    f_Image: {type:String,default:""},
    f_Name: {type:String,required: true},
    f_Email: {type:String,required: true},
    f_Mobile: {type:String,required: true},
    f_Designation: {type:String,required: true},
    f_gender: {type:String,required: true},
    f_Course: {type:[String],required: true},
    f_IsActive : {type:Boolean,required:true}
},{
    timestamps:true
})

const EmployeModel = mongoose.model('employe', employeSchema)
export default EmployeModel;