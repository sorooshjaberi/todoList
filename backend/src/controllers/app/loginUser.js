import User from "../../models/app/users.js";
import { compare } from "../../modules/hashing.js";
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await verifyUserHandler(username, password);
    res.status(200).json({ message: "login up successfully" });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

const verifyUserHandler = async (username, password) => {
  if (!(username && password)) {
    throw new Error("wrong input");
  }
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    throw new Error("no such user");
  }
  const isPassed = compare(password, user.password);
  if (!isPassed) {
    throw new Error("wrong password");
  }
};
