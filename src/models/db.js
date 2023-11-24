import Sequelize from "sequelize";
import "dotenv/config";

const db = new Sequelize({
  dialect: "mysql",
  username: process.env.db_username,
  password: process.env.db_pass,
  database: process.env.db_name,
  host: "127.0.0.1",
  logging: false,
});

export default db;
