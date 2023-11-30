import express from "express";
import db from "./models/db.js";
import appRouter from "./routes/v1/todolist/index.js";
import "./models/app/associations.js";
import Todo from "./models/app/todos.js";
import TodoGroup from "./models/app/todoGroups.js";
import User from "./models/app/users.js";
import routerV1 from "./routes/v1/router.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.userId = "1";
  next();
});

app.use("/api/v1", routerV1);

app.listen(8000, async () => {
  // await db.sync({ force: true });
  // await db.sync({alter : true})
  const user = await User.create({
    name: "soroush",
  });
});
