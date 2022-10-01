import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { corsMiddleware } from "./middlewares/cors.middleware";
import authRouter from "./routes/auth.routes";
import filesRouter from "./routes/files.routes";
import { PORT, DB_URL } from "./utils/constants/env";
import { PathsEnum } from "./utils/constants/Paths";

const app = express();

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());

app.use(PathsEnum.Files, filesRouter);
app.use(PathsEnum.Auth, authRouter);

const startApp = async () => {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

startApp();
