import db from "../db.js";
import { DataTypes } from "sequelize";

const Schedule = db.define("schedule", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    defaultValue: "Reminder",
    allowNull: false,
  },
});
export default Schedule;
