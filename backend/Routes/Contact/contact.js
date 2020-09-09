import express from "express";

import transporter from "../../transporter";

const Route = express.Router();

Route.post("/send", async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;
    let content = `name: ${name} \n email: ${email} \n message: ${message} `;

    let mail = {
      from: name,
      to: "pastelpack0@gmail.com", // Change to email address that you want to receive messages on
      subject: "New Message from Contact Form",
      text: content,
    };

    let info = await transporter.sendMail(mail);

    res.status(201).send({ message: "Message send", status: "success" });
  } catch (error) {
    res.status(400).send({ message: "Message not send", status: "fail" });
  }
});

export default Route;
