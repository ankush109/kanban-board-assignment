export type TaskType = {
  id: number;
  name: string;
  description: string;
  status: "todo" | "progress" | "done";
};

export type TaskStatus = "todo" | "progress" | "done";
export type KanbanColumnProps = {
  title: string;
  status: TaskType["status"];
  tasks: TaskType[];
  onEdit: (task: TaskType) => void;
  onDelete: (taskId: number) => void;
  onDragStart: (task: TaskType) => void;
  onDrop: (status: TaskType["status"]) => void;
  handleTouchStart : any,
  handleTouchMove :any
  handleTouchEnd:any
};
export interface Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
}
