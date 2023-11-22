import db from "../db.js";
import { DataTypes } from "sequelize";
const TodoGroup = db.define("todo_group", {
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
