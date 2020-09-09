import nodemailer from "nodemailer";
import config from "./config";
import hbs from "nodemailer-express-handlebars";
const { GMAIL_USER, GMAIL_PASSWORD } = config;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: GMAIL_USER, // generated ethereal user
    pass: GMAIL_PASSWORD, // generated ethereal password
  },
});

export default transporter;
