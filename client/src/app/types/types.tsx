export type TaskType = {
  id: number;
  name: string;
  description: string;
  status: "todo" | "progress" | "done";
  createdAt:any
  updatedAt:any
};


export type TaskStatus = "todo" | "progress" | "done";
export type KanbanColumnProps = {
  title: string;
  status: TaskType["status"];
  tasks: TaskType[];
  isUpdating:boolean
  onEdit: (task: TaskType) => void;
  onDelete: (task: Task) => void;
  onDragStart: (task: TaskType) => void;
  onDrop: (status: TaskType["status"]) => void;
  handleTaskInfo:any
  isTaskLoading:boolean
};
export interface Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt:any
  updatedAt:any
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  taskId: number;
}

export interface TaskProps {
  task: {
    id: number;
    name: string;
    description: string;
    status: string;
    createdAt:any
  };
  onClose: () => void;
}
export interface TaskModalProps {
  onClose: () => void;
  onSave: (task: any) => void;
  task?: TaskType | null;
}
export interface TaskCardProps {
  cardkey: any;
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDragStart: (task: Task) => void;
  handleTaskInfo: (task: Task) => void;
}