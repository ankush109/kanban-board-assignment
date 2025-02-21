"use client";

import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useTheme } from "../provider/ThemeProvider";
import { getCommentTasks } from "@/api/task";

// Define the type for comments
interface Comment {
  id: string;
  content: string;
  createdAt: string;
  taskId: number;
}

interface TaskProps {
  task: {
    id: number;
    name: string;
    description: string;
    status: string;
  };
  handleAddComment:(taskId:number,comment:string)=>void;
  onClose: () => void;
}

const TaskInfo: React.FC<TaskProps> = ({ task, onClose,handleAddComment }) => {
  const { theme } = useTheme();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showInput, setShowInput] = useState(false); // Controls input visibility

  const { data } = getCommentTasks(task.id);

  useEffect(() => {
    if (data && data.message?.length > 0) {
      setComments(data.message);
    } else {
      setComments([]);
    }
  }, [data]);

 

  return (
    <Modal onClose={onClose}>
      <div className={theme === "dark" ? "task-modal-info" : "task-modal-info"}>
        <div className={theme === "dark" ? "task-form-dark" : "task-form"}>
          <label>
            Title: <span>{task.name}</span>
          </label>
          <label>
            Description: <span>{task.description}</span>
          </label>
          <label>
            Status: <span>{task.status}</span>
          </label>

          <h3>Comments:</h3>
          <div className="comments-section">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.content}</p>
                  <small>{new Date(comment.createdAt).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {!showInput ? (
            <button onClick={() => setShowInput(true)}>Add Comment</button>
          ) : (
            <div className="add-comment-section">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={()=>handleAddComment(task.id,newComment)}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskInfo;
