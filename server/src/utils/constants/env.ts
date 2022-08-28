import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const JWT_KEY = process.env.JWT_KEY;
export const FILES_PATH = process.env.FILES_PATH;
