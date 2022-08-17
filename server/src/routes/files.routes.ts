import Router from "express";
import fileController from "../controllers/File.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const filesRouter = Router();

filesRouter.post("", authMiddleware, fileController.createDir);
filesRouter.get("", authMiddleware, fileController.getFiles);

export default filesRouter;
