import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const TaskController = {
  async createTask(req, res) {
    try {
      const { name, description, status } = req.body;
      console.log(name,"create")
      const task = await prisma.task.create({
        data: {
          name,
          description,
          status,
        },
      });
      res.json(customResponse(200, task));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },
  async addComment(req, res) {
    try {
      const taskId = req.params.id
      const { comment  } =  req.body
      console.log(comment,"comment")
      const Comment = await prisma.comment.create({
       data:{
        taskId:taskId,
        content :comment
       }
      });
      res.json(customResponse(200, Comment));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },
  async deleteComment(req, res) {
    try {
      console.log("in delete comment")
      const commentId = req.params.id
      const Comment = await prisma.comment.delete({
      where:{
        id:commentId
      }
      });
      res.json(customResponse(200, Comment));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },
  async getComment(req, res) {
    try {
      const taskId = req.params.id

      const Comment = await prisma.comment.findMany({
      where:{
        taskId:taskId
      }
      });
      res.json(customResponse(200, Comment));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },
  async getTasks(req, res) {
    try {
      const tasks = await prisma.task.findMany();
      res.json(customResponse(200, tasks));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },

  async updateTask(req, res) {
    try {
      const taskId = req.params.id
      

      const { name, description, status } = req.body;
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (status !== undefined) updateData.status = status;

      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: updateData,
      });

      res.json(customResponse(200, updatedTask));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },

  async removeTask(req, res) {
    try {
      const taskId = req.params.id
  

      const deletedTask = await prisma.task.delete({
        where: { id: taskId },
      });

      res.json(customResponse(200, deletedTask));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },
};

export default TaskController;
