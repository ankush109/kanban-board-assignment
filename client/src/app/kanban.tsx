"use client";
import React, { useEffect, useRef, useState } from "react";
import "./styles/kanban.css";
import "./styles/toggle.css";
import TaskModal from "./components/TaskModal";
import KanbanColumn from "./components/KanboardColumn";
import { Task, TaskType } from "./types/types";
import { useTheme } from "./provider/ThemeProvider";
import {
  getTasksQuery,
  useAddCommentMutation,
  useAddTaskMutation,
  usedeleteTaskMutation,
  useUpdateTaskMutation,
} from "../api/task/index";
import toast from "react-hot-toast";
import TaskInfo from "./components/TaskInfo";

function Kanban() {
  const { theme, toggleTheme } = useTheme();
  const { mutate: addTask } = useAddTaskMutation();
  const { mutate: updateTask } = useUpdateTaskMutation();
  const { mutate: deleteTask } = usedeleteTaskMutation();
  const { data, refetch } = getTasksQuery();

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInfo, setTaskInfo] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const [undoTask, setUndoTask] = useState<TaskType | null>(null);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [updatingColumn, setUpdatingColumn] = useState<any| null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    if (data && data.message.length > 0) {
      setTasks(data.message);
    } else {
      setTasks([]);
    }
  }, [data]);

  const openModal = (task?: TaskType) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const addOrEditTask = (task: any) => {
    const mutationOptions = {
      onSuccess: () => {
        toast.success(`Task ${editingTask ? "updated" : "added"} successfully`);
        refetch();
        closeModal();
      },
      onError: () => {
        toast.error("Error occurred while updating");
      },
    };

    editingTask ? updateTask(task, mutationOptions) : addTask(task, mutationOptions);
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(task.id, {
      onSuccess: () => {
        toast.success("Task Deleted successfully!");
        setUndoTask(task);
        refetch();
      },
      onError: () => {
        toast.error("Error occurred while deleting");
      },
    });
  };

  const handleUndoDelete = () => {
    if (undoTask) {
      addTask(undoTask, {
        onSuccess: () => {
          toast.success("Task undo successfully");
          refetch();
          setUndoTask(null);
        },
        onError: () => {
          toast.error("Error occurred while undoing");
        },
      });
    }
  };

  const handleDragStart = (task: TaskType) => setDraggedTask(task);

  const handleDrop = async (newStatus: TaskType["status"]) => {
    if (draggedTask) {
      setUpdatingColumn(newStatus); 
      try {
        await updateTask(
          { id: draggedTask.id, status: newStatus },
          {
            onSuccess: () => {
              refetch();
              setUpdatingColumn(""); 
            },
            onError: (error) => {
              console.error("Failed to update task:", error);
              setUpdatingColumn(""); 
            },
          }
        );
      } catch (error) {
        console.error("Error:", error);
        setUpdatingColumn("");
      }
      setDraggedTask(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent, task: TaskType) => {
    setDraggedTask(task);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    if (e.target instanceof HTMLElement) e.target.classList.add("dragging");
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedTask) return;

    e.preventDefault();
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const column = elements.find((el) => el.classList.contains("kanban-column")) as HTMLElement;

    if (column) {
      const status = column.dataset.status as TaskType["status"];
      if (status && draggedTask.status !== status) {
        setTasks(tasks.map((task) => (task.id === draggedTask.id ? { ...task, status } : task)));
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.target instanceof HTMLElement) e.target.classList.remove("dragging");
    setDraggedTask(null);
  };

  const handleTaskInfo = (task: TaskType) => {
    setCurrentTask(task);
    setTaskInfo(true);
  };

  const closeTaskInfo = () => {
    setTaskInfo(false);
    setCurrentTask(null);
  };

  return (
    <div className="kanban-container">
      <div className="widgets">
        <div className="flex">
          <button className="add-task-button" onClick={() => openModal()}>Add Task</button>
          <button disabled={!undoTask} className="add-task-button" onClick={handleUndoDelete}>Undo</button>
        </div>
        <div className={theme === "dark" ? "toggle-slide-1" : "toggle-slide"} onClick={toggleTheme}>
          <div className={`switch ${theme === "dark" ? "slide" : ""}`}></div>
        </div>
      </div>

      <div className="kanban-board">
        {["todo", "progress", "done"].map((status) => (
          <KanbanColumn
            key={status}
            title={status === "todo" ? "To Do" : status === "progress" ? "In Progress" : "Done"}
            status={status as TaskType["status"]}
            tasks={tasks}
            handleTaskInfo={handleTaskInfo}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            onEdit={openModal}
            onDelete={handleDeleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            isUpdating={updatingColumn === status} 
          />
        ))}
      </div>

      {taskInfo && currentTask && <TaskInfo task={currentTask} onClose={closeTaskInfo} />}
      {isModalOpen && <TaskModal onClose={closeModal} onSave={addOrEditTask} task={editingTask} />}
    </div>
  );
}

export default Kanban;