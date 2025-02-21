import express from "express";
import { TaskController } from "../controllers";


const router = express.Router();
router.post("/create",  TaskController.createTask);
router.get("/",  TaskController.getTasks);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.removeTask);
router.post("/addComment/:id",TaskController.addComment)
router.get("/comment/:id",TaskController.getComment)
export default router;
