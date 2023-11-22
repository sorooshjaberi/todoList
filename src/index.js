import express from "express";
import db from "./models/db.js";
import appRouter from "./routes/app.js";
import "./models/app/associations.js";

const app = express();

app.use("/app", appRouter);

app.get("/", (req, res) => res.redirect("/app"));

app.listen(8000, () => {
  db.sync({ force: true });
});
