import crypto from "crypto";
export const hash = (value) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");

  return hashedPassword;
};

export const compare = (plain, hashed) => {
  return hash(plain) === hashed;
};
