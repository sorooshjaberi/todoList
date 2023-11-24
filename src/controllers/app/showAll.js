import { QueryTypes } from "sequelize";
import Todo from "../../models/app/todos.js";
import db from "../../models/db.js";
import TodoGroup from "../../models/app/todo_groups.js";
import User from "../../models/app/users.js";

export const showAllTodos = async function (req, res) {
  const user = req.userId;

  const todoGroups = await User.findByPk(user, {
    include: {
      // model: TodoGroup,
      // include: [TodoGroup, Todo],
      nested: true,
      all: true,
    },
  });

  res.json(todoGroups);
};
export const addATodo = async function (req, res) {
  const { userId, groupData, todoData } = req.body;
  const user = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: TodoGroup,
        include: [{ model: Todo }],
      },
    ],
  });

  const [todoGroup, created] = await TodoGroup.findOrCreate({
    where: {
      id: groupData.id,
    },
    defaults: groupData,
  });

  if (created) {
    await user.addTodoGroup(todoGroup);
  }

  const [todo, updated] = await Todo.upsert(todoData, {
    returning: true,
  });

  if (!updated) {
    await todoGroup.addTodo(todo);
  }

  res.status(200);
};
