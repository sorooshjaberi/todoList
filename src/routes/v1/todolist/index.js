import express from "express";
import { addATodo, showGroups } from "../../../controllers/app/showAll.js";
import { createGroup } from "../../../controllers/app/createGroup.js";

const todolistRouter = express.Router();

todolistRouter.get("/index/:parent?", showGroups);

todolistRouter.post("/add", addATodo);

todolistRouter.post("/todoGroups/new", createGroup);

export default todolistRouter;
