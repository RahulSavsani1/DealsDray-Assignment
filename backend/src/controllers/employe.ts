import { Request, Response } from "express";
import EmployeModel from "../models/employeModel";

export const addEmploye = async (req:Request,res:Response) => {
    try {
        const { payload } = req.body;

        const employeDetails = JSON.parse(payload)
        const existingEmploye = await EmployeModel.findOne({f_Email:employeDetails.email});
        const numberOfEmploye = await EmployeModel.find();

        const imagePath = req.file!.filename;

        if(existingEmploye){
            res.status(400).json({
                success:false,
                message:"Employee Already Exists"
            })
        }else{
            const newEmploye = new EmployeModel({
                f_Id: numberOfEmploye.length + 1,
                f_Image: imagePath,
                f_Name: employeDetails.name,
                f_Email: employeDetails.email,
                f_Mobile: employeDetails.mobileNumber,
                f_Designation: employeDetails.designation,
                f_gender: employeDetails.gender,
                f_Course: employeDetails.course,
                f_IsActive: true
            })
    
            const savedEmploye = await newEmploye.save();
    
            const employeDetail = await EmployeModel.findOne({f_Email:employeDetails.email})
    
            res.status(200).json({
                success:true,
                message:"Employee Added Successfully",
                data : employeDetail
            })
        }
    } catch (error) {
        console.log("addEmploye error" , error)
        res.status(400).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const getEmploye = async (req: Request, res:Response) => {
    try {
        const allEmployee = await EmployeModel.find()

        res.status(200).json({
            success:true,
            message:"All Employe Data Fetched Successfully",
            data: allEmployee
        })
    } catch (error) {
        console.log("getEmploye error" , error)
        res.status(400).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const getEmployeById = async (req: Request, res:Response) => {
    try {
        const employeId = req.params.id

        const employeData = await EmployeModel.findById({_id : employeId})

        res.status(200).json({
            success:true,
            message:"Employee Fetched Successfully",
            data:employeData
        })
    } catch (error) {
        console.log("getEmployeById error" , error)
        res.status(400).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const updateEmploye = async (req: Request, res:Response) => {
    try {
        const employeId = req.params.id;
        
        const { employeDetails } = req.body;

        const updateUser = await EmployeModel.findByIdAndUpdate(employeId,{
         $set: {  
            f_Id: employeDetails.id,
            f_Image: employeDetails.image,
            f_Name: employeDetails.name,
            f_Email: employeDetails.email,
            f_Mobile: employeDetails.mobileNumber,
            f_Designation: employeDetails.designation,
            f_gender: employeDetails.gender,
            f_Course: employeDetails.course,
            f_IsActive:employeDetails.isActive
            }
        })

        // const updatedEmploye = await EmployeModel.find({f_Email:employeDetails.email})

        res.status(200).json({
            success:true,
            message:"User Updated Successfully",
            // data: updatedEmploye
        })
    
    } catch (error) {
        console.log("updateEmployee error" , error)
        res.status(400).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const deleteEmploye = async (req: Request, res:Response) => {
    try {
        const employeId = req.params.id

        const deleteEmploye = await EmployeModel.findByIdAndDelete(employeId)

        res.status(200).json({
            success:true,
            message:"Employee Deleted Successfully"
        })
    } catch (error) {
        console.log("deleteEmployee error" , error)
        res.status(400).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}