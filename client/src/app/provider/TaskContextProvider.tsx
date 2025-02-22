"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface Task {
  id: number;
  name: string;
  description: string;
}

interface TaskContextType {
  task: Task | null;
  setUndoTask: (task: Task) => void;
  getUndoTask: () => Task | null;
  clearUndoTask: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [task, setTaskState] = useState<Task | null>(null);

  useEffect(() => {
    const storedTask = localStorage.getItem("task");
    if (storedTask) {
      setTaskState(JSON.parse(storedTask))
    }
  }, []);

  useEffect(() => {
    if (task) {
      localStorage.setItem("task", JSON.stringify(task));
    } else {
      localStorage.removeItem("task");
    }
  }, [task]);

  const getUndoTask = () => {
    return task;
  };

  const setUndoTask = (task: Task) => {
    setTaskState(task);
  };

  const clearUndoTask = () => {
    setTaskState(null);
  };

  return (
    <TaskContext.Provider value={{ task, setUndoTask, getUndoTask, clearUndoTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}