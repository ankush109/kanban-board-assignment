import { useTheme } from "../provider/ThemeProvider";
import { Task, TaskCardProps } from "../types/types";
import { Eye } from 'lucide-react';
const TaskCard = ({
  cardkey,
  task,
  onEdit,
  onDelete,
  onDragStart,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleTaskInfo,
}: TaskCardProps) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const cardClass = isDarkTheme ? "task-card" : "task-card-light";

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task);
  };

  return (
    <div
      key={cardkey}
      className={cardClass}
      draggable
     
      onDragStart={() => onDragStart(task)}
      onTouchStart={(e) => handleTouchStart(e, task)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
   
   <div className="task-eye">
   <h1 className="title">{task.name}</h1>
      <div onClick={()=>handleTaskInfo(task)}>
    <Eye  />
    </div>
   </div>
      <p className="description">{task.description}</p>
      <div className="task-actions">
        <button className="edit-button" onClick={handleEditClick}>
          ✏️ Edit
        </button>
        <button className="delete-button" onClick={handleDeleteClick}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
