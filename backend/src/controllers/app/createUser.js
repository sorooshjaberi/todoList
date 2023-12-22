import User from "../../models/app/users.js";

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await createUserHandler(username, password);
    res.status(200).json({ message: "Signed up successfully" });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

const createUserHandler = async (username, password) => {
  if (!(username && password)) {
    throw new Error("wrong input");
  }
  const newUser = await User.create({
    password,
    username,
  });
  return newUser;
};
