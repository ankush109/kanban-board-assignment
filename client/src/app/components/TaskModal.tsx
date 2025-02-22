"use client";
import { useState } from "react";
import { TaskModalProps, TaskType } from "../types/types";
import Modal from "./modal";
import { useTheme } from "../provider/ThemeProvider";
import toast from "react-hot-toast";


const TaskModal = ({ onClose, onSave, task }: TaskModalProps) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState(task?.name || "");
  const [desc, setDesc] = useState(task?.description || "");
  const [status, setStatus] = useState<TaskType["status"]>(task?.status || "todo");

  const handleSave = () => {
    if (!title || !desc) toast.error("Please enter title and description")
    onSave({ id: task?.id , name: title, description: desc, status});
  };

  const isDarkTheme = theme === "dark";
  const modalClass = isDarkTheme ? "task-modal-dark" : "task-modal";
  const headerClass = isDarkTheme ? "task-modal-dark-h2" : "task-modal-h2";
  const formClass = isDarkTheme ? "task-form-dark" : "task-form";

  return (
    <Modal onClose={onClose}>
      <div className={modalClass}>
        <h2 className={headerClass}>{task ? "Edit Task" : "Add Task"}</h2>
        <div className={formClass}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </label>
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskType["status"])}
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <button className="save-task-button" onClick={handleSave}>
            {task ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;