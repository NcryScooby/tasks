import { Router } from "express";
import { TasksController } from "../controllers";

const router = Router();

router.post("/create", TasksController.createValidation, TasksController.create);

export { router };
