"use client";
import React, { useEffect, useRef, useState } from "react";
import "./styles/kanban.css";
import "./styles/toggle.css";
import TaskModal from "./components/TaskModal";
import KanbanColumn from "./components/KanboardColumn";
import { TaskType } from "./types/types";
import { useTheme } from "./provider/ThemeProvider";
import {
  getTasksQuery,
  useAddTaskMutation,
  usedeleteTaskMutation,
  useUpdateTaskMutation,
} from "../api/task/index";
function Kanban() {
  const { theme, toggleTheme } = useTheme();
  const { mutate: addTask } = useAddTaskMutation();
  const { mutate: updateTask } = useUpdateTaskMutation();
  const { mutate: deleteTask } = usedeleteTaskMutation();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const { data, isLoading ,refetch} = getTasksQuery();
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  useEffect(() => {
    if (data && data.message.length > 0) {
      console.log(data, "tasks");
      setTasks(data.message);
    }
  }, [data]);

  const openModal = (task?: TaskType) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const addOrEditTask = (task: TaskType) => {
    if (editingTask) {
      console.log(task);
      updateTask(task, {
        onSuccess: () => {
          console.log("Task updated successfully!");
        },
        onError: (error) => {
          console.error("Failed to update task:", error);
        },
      });
    } else {
      console.log(task, "task");
      addTask(task, {
        onSuccess: () => {
          console.log("Task added successfully!");
          closeModal();
        },
        onError: (error) => {
          console.error("Failed to add task:", error);
        },
      });
    }
    closeModal();
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId, {
      onSuccess: () => {
        refetch()
      },
      onError: (error) => {
        console.error("Failed to add task:", error);
      },
    });
  };

  const handleDragStart = (task: TaskType) => {
    setDraggedTask(task);
  };

  const handleDrop = (newStatus: TaskType["status"]) => {
    if (draggedTask) {
      updateTask(
        {
          id: draggedTask.id,
          status: newStatus,
        },
        {
          onSuccess: () => {
            console.log("Task updated successfully!");
          },
          onError: (error) => {
            console.error("Failed to update task:", error);
          },
        }
      );
      setDraggedTask(null);
    }
  };
  const handleTouchStart = (e: React.TouchEvent, task: TaskType) => {
    setDraggedTask(task);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    if (e.target instanceof HTMLElement) {
      e.target.classList.add('dragging');
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedTask) return;
    
    // e.preventDefault();
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const column = elements.find(el => 
      el.classList.contains('kanban-column')
    ) as HTMLElement;

    if (column) {
      const status = column.dataset.status as TaskType['status'];
      if (status && draggedTask.status !== status) {
        setTasks(tasks.map(task =>
          task.id === draggedTask.id ? { ...task, status } : task
        ));
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('dragging');
    }
    setDraggedTask(null);
  };

  return (
    <div className="kanban-container">
      <div className="widgets">
        <button className="add-task-button" onClick={() => openModal()}>
          ➕ Add Task
        </button>
        <div
          className={theme == "dark" ? "toggle-slide-1" : "toggle-slide"}
          onClick={toggleTheme}
        >
          <div className={`switch ${theme == "dark" ? "slide " : ""}`}></div>
        </div>
      </div>
    

      
      <div className="kanban-board">
        {["todo", "progress", "done"].map((status) => (
          <KanbanColumn
       
          handleTouchEnd={handleTouchEnd}
          handleTouchMove={handleTouchMove}
          handleTouchStart={handleTouchStart}
            key={status}
            title={
              status === "todo"
                ? "To Do"
                : status === "progress"
                ? "In Progress"
                : "Done"
            }
            status={status as TaskType["status"]}
            tasks={tasks}
            onEdit={openModal}
            onDelete={handleDeleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          onClose={closeModal}
          onSave={addOrEditTask}
          task={editingTask}
        />
      )}
    </div>
  );
}

export default Kanban;
