import express from "express";
import { loginUser } from "../../../controllers/app/loginUser.js";
const userRouter = express.Router();

userRouter.get("/login", loginUser);

export default userRouter;