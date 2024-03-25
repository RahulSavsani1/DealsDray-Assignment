import { Router } from "express"
import { addEmploye, getEmployeById, getEmploye, updateEmploye, deleteEmploye } from "../controllers/employe";
import upload from "../middleware/employeImage";

const employeRouter = Router();

employeRouter.post("/addEmploye",upload.single("image"),addEmploye)
// employeRouter.post("/addEmploye",addEmploye)
employeRouter.get("/getEmploye",getEmploye)
employeRouter.get("/getEmployeById/:id",getEmployeById)
employeRouter.put("/updateEmploye/:id",updateEmploye)
employeRouter.delete("/deleteEmploye/:id",deleteEmploye)

export default employeRouter;