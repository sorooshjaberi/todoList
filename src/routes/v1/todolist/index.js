import express from "express";
import { addATodo, showGroups } from "../../../controllers/app/showAll.js";
import { createGroup } from "../../../controllers/app/createGroup.js";
import { createTodo } from "../../../controllers/app/createTodo.js";
import { editTodo } from "../../../controllers/app/editTodo.js";
import { todoSingleSoftDelete } from "../../../controllers/app/deleteTodo.js";
import { groupSingleSoftDelete } from "../../../controllers/app/deleteGroups.js";

const todolistRouter = express.Router();

todolistRouter.get("/todoGroups/:parent?", showGroups);

todolistRouter.post("/todoGroups/new", createGroup);

todolistRouter.post("/add", addATodo);

todolistRouter.post("/todos/new", createTodo);

todolistRouter.put("/todos/:todoId/edit", editTodo);

todolistRouter.delete("/todos/:todoId/delete", todoSingleSoftDelete);

todolistRouter.delete("/todoGroups/:groupId/delete", groupSingleSoftDelete)

export default todolistRouter;
