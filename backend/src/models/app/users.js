import { DataTypes } from "sequelize";
import db from "../db.js";
import { hash } from "../../modules/hashing.js";

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = hash(value);
      this.setDataValue("password", hashedPassword);
    },
  },
});
export default User;
