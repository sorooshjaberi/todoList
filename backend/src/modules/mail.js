import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass,
  },
});

export const sendMail = (to, subject = "mail from todolist", text) => {
  return transporter.sendMail({
    from: process.env.email_user,
    to,
    subject,
    text,
  });
};
