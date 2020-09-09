import dotenv from "dotenv";
dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  PORT: process.env.PORT || 5000,
};
