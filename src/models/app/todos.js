import db from "../db.js";
import { DataTypes } from "sequelize";

const Todo = db.define(
  "todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    done: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  },
  { paranoid: true }
);

export default Todo;
