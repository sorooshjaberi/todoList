import Todo from "./todos.js";
import TodoGroup from "./todo_groups.js";
import Schedule from "./schedules.js";
import User from "./users.js";

User.hasMany(TodoGroup);
TodoGroup.belongsTo(User);

TodoGroup.hasMany(Todo);
Todo.belongsTo(TodoGroup);

TodoGroup.hasMany(TodoGroup);
TodoGroup.belongsTo(TodoGroup);

Todo.hasMany(Schedule);
Schedule.belongsTo(Todo);
