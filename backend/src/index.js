import express from "express";
import db from "./models/db.js";
import appRouter from "./routes/v1/todolist/index.js";
import "./models/app/associations.js";
import Todo from "./models/app/todos.js";
import TodoGroup from "./models/app/todoGroups.js";
import User from "./models/app/users.js";
import routerV1 from "./routes/v1/router.js";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());

app.use(async (req, res, next) => {
  const user = await User.findByPk("1");
  req.userId = "1";
  next();
});

app.use("/api/v1", routerV1);

app.listen(8000, async () => {
  await db.sync({ alter: true });
  const [user] = await User.findOrCreate({
    where: {
      username: "soroush",
    },
    defaults: {
      username: "soroush",
      password: "#abcd",
    },
  });
});
