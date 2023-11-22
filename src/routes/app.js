import express from "express";
import { showAllTodos } from "../controllers/app/index";

const router = express.Router();

router.get("/", showAllTodos);

export default router;
