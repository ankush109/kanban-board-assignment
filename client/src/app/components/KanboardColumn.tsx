import React, { useRef } from "react";
import TaskCard from "./TaskCard";
import { KanbanColumnProps } from "../types/types";
import { useTheme } from "../provider/ThemeProvider";

function KanbanColumn({
  title,
  status,
  tasks,
  onEdit,
  onDelete,
  onDragStart,
  onDrop,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
}: KanbanColumnProps) {
  const filteredTasks = tasks.filter((task) => task.status === status);
  const { theme } = useTheme()
  return (
    <div
      className={`${theme == "dark" ? "kanban-column" : "kanban-column-light"}`}
      data-status={status}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(status)}
    >
      <h3 className={`${theme == "dark" ? "column_title" : "column_title_light"}`}>{title}</h3>
      {filteredTasks.map((task) => (
        <TaskCard
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
      ))}
    </div>
  );
}

export default KanbanColumn;
