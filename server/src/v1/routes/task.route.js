import express from "express";
import { TaskController } from "../controllers";


const router = express.Router();
router.post("/create",  TaskController.createTask);
router.get("/",  TaskController.getTasks);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.removeTask);
export default router;
