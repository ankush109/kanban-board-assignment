import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { KanbanColumnProps } from "../types/types";
import { useTheme } from "../provider/ThemeProvider";
import { Search } from "lucide-react";

function KanbanColumn({
  title,
  status,
  isUpdating,
  tasks,
  onEdit,
  onDelete,
  onDragStart,
  onDrop,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  handleTaskInfo,
}: KanbanColumnProps) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState<{ [key: string]: string }>({});

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, columnStatus: string) => {
    const value = e.target.value;
    setSearchTerm((prev) => ({ ...prev, [columnStatus]: value }));
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.status === status &&
        (searchTerm[status]?.trim()
          ? task.name.toLowerCase().includes(searchTerm[status].trim().toLowerCase())
          : true)
    )
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div
      className={`${theme === "dark" ? "kanban-column" : "kanban-column-light"}`}
      data-status={status}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(status)}
    >
      <h3 className={`${theme === "dark" ? "column_title" : "column_title_light"}`}>{title}</h3>
      <div className="search-container">
        <div className="search-icon">
          <Search className={theme === "dark" ? "icon-dark" : "icon-light"} />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm[status] || ""}
          onChange={(e) => handleSearchChange(e, status)}
          className={`search-input ${theme === "dark" ? "search-input-dark" : "search-input-light"}`}
        />
      </div>
      <div className="task-wrapper">
        {isUpdating && <div className="spinner"></div>}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              handleTaskInfo={handleTaskInfo}
              handleTouchEnd={handleTouchEnd}
              handleTouchMove={handleTouchMove}
              handleTouchStart={handleTouchStart}
              key={task.id}
              cardkey={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
            />
          ))
        ): <div className={theme =="dark" ? "no-task-dark":"no-task-white"}>
          
          No task Found!
          </div>}
      </div>
    </div>
  );
}

export default KanbanColumn;