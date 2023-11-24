import express from "express";
import todolistRouter from "./todolist/index.js";

const router = express.Router();
router.use("/todolist", todolistRouter);

export default router;
