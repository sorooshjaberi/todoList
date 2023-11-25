import express from "express";
import { addATodo, showGroups } from "../../../controllers/app/showAll.js";
import { createGroup } from "../../../controllers/app/createGroup.js";
import { createTodo } from "../../../controllers/app/createTodo.js";

const todolistRouter = express.Router();

todolistRouter.get("/todoGroups/:parent?", showGroups);

todolistRouter.post("/todoGroups/new", createGroup);

todolistRouter.post("/add", addATodo);

todolistRouter.post("/todos/new",createTodo)

export default todolistRouter;
