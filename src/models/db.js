import Sequelize from "sequelize";


const db = new Sequelize({
  dialect: "mysql",
  username: "test1",
  password: "1234321",
  database: "todolist",
  host: "127.0.0.1",
});

export default db;
