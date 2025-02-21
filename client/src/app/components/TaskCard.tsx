import { useTheme } from "../provider/ThemeProvider";
import { Task } from "../types/types";

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
  
}: {
  cardkey: any;
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDragStart: (task: Task) => void;
  handleTouchStart : any,
  handleTouchMove : any,
  handleTouchEnd:any
  handleTaskInfo:any
}) => {
const { theme } = useTheme()
  return (
    <div
      key={cardkey}
      className={`${theme == "dark" ? 'task-card' : 'task-card-light'}`}
      draggable
      onClick={()=>handleTaskInfo(task)}
      onDragStart={() => onDragStart(task)}
      onTouchStart={(e) => handleTouchStart(e, task)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h1 className="title">{task.name}</h1>
      <p className="description">{task.description}</p>
      <div className="task-actions">
        <button className="edit-button"   onClick={(e) => {
            e.stopPropagation(); // Prevents bubbling to parent
            onEdit(task);
          }}>
          ✏️ Edit
        </button>
        <button className="delete-button"  onClick={(e) => {
            e.stopPropagation(); // Prevents bubbling to parent
            onDelete(task);
          }}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
