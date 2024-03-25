import { Router } from "express"
import { userLogin, userSignUp } from "../controllers/user";

const userRouter = Router();

userRouter.post("/userSignUp",userSignUp)
userRouter.post("/userLogin",userLogin)

export default userRouter;