import express from "express";
import todolistRouter from "./todolist/index.js";
import userRouter from "./user/index.js";

const router = express.Router();

router.use("/todolist", todolistRouter);
router.use("/user", userRouter);

export default router;
