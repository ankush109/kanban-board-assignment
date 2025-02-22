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
  const { mutate: addComment } = useAddCommentMutation();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInfo,setTaskInfo] =useState(false)
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const [undoTask,setundoTask] = useState<TaskType | null>(null)
  const { data, isLoading, refetch } = getTasksQuery();
  const [currentTask ,setcurrentTask ] = useState<TaskType | null>(null)
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  useEffect(() => {
    if (data && data.message.length > 0) {
      console.log(data, "tasks");
      setTasks(data.message);
    }else{
      setTasks([])
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
          toast.success("Task updated successfully");
          refetch();
        },
        onError: (error) => {
          toast.success("Error occurred while updating");
        },
      });
    } else {
      console.log(task, "task");
      addTask(task, {
        onSuccess: () => {
          console.log("Task added successfully!");
          toast.success("Task addded successfully");
          refetch();
          closeModal();
        },
        onError: (error) => {
          toast.success("Error occurred while updating");
        },
      });
    }
    closeModal();
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(task.id, {
      onSuccess: () => {
        console.log(task,"Task Deleted successfully!");
        toast.success("Task Deleted successfully!")
        setundoTask(task)
        refetch();
      },
      onError: (error) => {
        toast.success("Error occurred while updating");
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
      e.target.classList.add("dragging");
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedTask) return;

    e.preventDefault();
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const column = elements.find((el) =>
      el.classList.contains("kanban-column")
    ) as HTMLElement;

    if (column) {
      const status = column.dataset.status as TaskType["status"];
      if (status && draggedTask.status !== status) {
        setTasks(
          tasks.map((task) =>
            task.id === draggedTask.id ? { ...task, status } : task
          )
        );
      }
    }
  };
  const handleAddComment = (taskId:any,comment:any) => {
    console.log(taskId,"taskid")
    const taskData = {
      comment:comment,
      taskId:taskId
    }
    addComment({taskData}, {
      onSuccess: () => {
       console.log(comment,"comment")
       
      },
      onError: (error) => {
        toast.success("Error occurred while updating");
      },
    });
  }
  const handleUndoDelete = () => {
   if(undoTask){
    addTask(undoTask, {
      onSuccess: () => {
        console.log("Task added successfully!");
        toast.success("Task undo successfully");
        refetch();
        setundoTask(null)
       
      },
      onError: (error) => {
        toast.success("Error occurred while updating");
      },
    });
   }
  
  }
  const handleTaskInfo = (task: TaskType) => {
    console.log(task,"handletaskinfo")
    setcurrentTask(task);
    setTaskInfo(true);  
  };
  
  const closeTaskInfo = () => {
    setTaskInfo(false);
    setcurrentTask(null);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove("dragging");
    }
    setDraggedTask(null);
  };

  return (
    <div className="kanban-container">
      <div className="widgets">
        <button className="add-task-button" onClick={() => openModal()}>
          Add Task
        </button>
        <button  disabled={undoTask==null}className="add-task-button" onClick={handleUndoDelete}>
          Undo
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
          handleTaskInfo={handleTaskInfo}
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
   {taskInfo && currentTask && (
    <TaskInfo task={currentTask}  onClose={closeTaskInfo}/>
   )}
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
