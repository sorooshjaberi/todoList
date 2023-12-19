import { INTEGER, DATE, STRING, BOOLEAN } from "sequelize";
import db from "../db.js";

const Schedule = db.define("schedule", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  time: {
    type: DATE,
    allowNull: false,
  },
  text: {
    type: STRING,
    defaultValue: "Reminder",
    allowNull: false,
  },
  enabled: {
    type: BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
});
export default Schedule;
