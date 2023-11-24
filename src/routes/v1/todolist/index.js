import express from "express";
import { addATodo, showAllTodos } from "../../../controllers/app/showAll.js";
import { createGroup } from "../../../controllers/app/createGroup.js";

const todolistRouter = express.Router();

todolistRouter.get("/index", showAllTodos);

todolistRouter.post("/add", addATodo);

todolistRouter.post("/todoGroups/new", createGroup);

export default todolistRouter;
