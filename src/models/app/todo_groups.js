import db from "../db.js";
import { DataTypes } from "sequelize";
import User from "./users.js";
const TodoGroup = db.define("todoGroup", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default TodoGroup;
