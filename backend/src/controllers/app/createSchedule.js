import nodeSchedule from "node-schedule";
import Schedule from "../../models/app/schedules.js";
import { sendMail } from "../../modules/mail.js";
import Todo from "../../models/app/todos.js";
const userEmail = "sorooshjaberi@gmail.com";
export const createSchedule = async (req, res) => {
  const { time, scheduleText, todoId } = req.body;
  const { userId } = req;
  try {
    timeValidator(time);
    checkInputs(time, scheduleText, todoId);
    const schedule = await setTimer(scheduleText, time, +userId, +todoId);

    res.send(schedule);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const checkInputs = (...args) => {
  if (!args.every((item) => !!item)) {
    throw new Error("wrong input");
  }
};

const setTimer = async (text, time, userId, todoId) => {
  if (!(await Todo.findByPk(todoId))) throw new Error("no such todo exists");

  const schedule = await Schedule.create({
    text,
    time,
    userId,
    todoId,
  });

  nodeSchedule.scheduleJob(new Date(time), async () => {
    sendMail(
      userEmail,
      `Schedues Reminder ${await getTodoTitle(todoId)}`,
      text
    );
  });

  return schedule;
};

const getTodoTitle = async (todoId) => {
  const { title } = await Todo.findByPk(todoId, {
    attributes: ["title"],
  });
  return title;
};

const timeValidator = (time) => {
  if (time < Date.now()) throw new Error("schedule time is in the past!");
};
