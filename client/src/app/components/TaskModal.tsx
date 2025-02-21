"use client"
import { useState } from "react";
import { TaskType } from "../types/types";
import Modal from "./modal";
import { useTheme } from "../provider/ThemeProvider";


const TaskModal = ({
    onClose,
    onSave,
    task,
  }: {
    onClose: () => void;
    onSave: (task: TaskType) => void;
    task?: TaskType | null;
  }) => {
    const {theme} = useTheme()
    const [title, setTitle] = useState(task?.name || "");
    const [desc, setDesc] = useState(task?.description || "");
    const [status, setStatus] = useState<TaskType["status"]>(task?.status || "todo");
  
    const handleSave = () => {
      if (!title || !desc) return alert("Title and Description are required!");
      onSave({ id: task?.id || Date.now(), name: title, description: desc, status });
    
    };
  
    return (
      <Modal onClose={onClose}>
        <div className={theme=="dark" ? "task-modal-dark":"task-modal"}>
          <h2 className={theme == "dark" ? "task-modal-dark-h2":"task-modal-h2"}>{task ? "Edit Task" : "Add Task"}</h2>
          <div className={theme == "dark" ? "task-form-dark" :"task-form"}>
            <label>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
              Description:
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required />
            </label>
            <label>
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value as TaskType["status"])}>
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
