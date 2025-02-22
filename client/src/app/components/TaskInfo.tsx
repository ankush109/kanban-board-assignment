"use client";

import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useTheme } from "../provider/ThemeProvider";
import { getCommentTasks, useAddCommentMutation } from "@/api/task";
import toast from "react-hot-toast";
import { Comment, TaskProps } from "../types/types";

const TaskInfo: React.FC<TaskProps> = ({ task, onClose }) => {
  const { theme } = useTheme();
  const { mutate: addComment } = useAddCommentMutation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { data, refetch } = getCommentTasks(task.id);

  const handleAddComment = (taskId: any, comment: any) => {
    console.log(taskId, "taskid");
    const taskData = {
      comment: comment,
      taskId: taskId,
    };
    addComment(
      { taskData },
      {
        onSuccess: () => {
          toast.success("Comment added successfully!");
          refetch();
          setNewComment("");
        },
        onError: (error) => {
          toast.success("Error occurred while updating");
        },
      }
    );
  };
  useEffect(() => {
    if (data && data.message?.length > 0) {
      setComments(data.message);
    } else {
      setComments([]);
    }
  }, [data]);

  return (
    <Modal onClose={onClose}>
      <div
        className={
          theme === "dark" ? "task-modal-info" : "task-modal-info-light"
        }
      >
        <div className={theme === "dark" ? "task-form-dark" : "task-form"}>
          <label>
            <span className="title-info">{task.name}</span>
          </label>
          <label>
            <span className="description">{task.description}</span>
          </label>
          <label>
            <span>{task.status}</span>
          </label>

          <h3
            className={`${
              theme == "dark" ? "column_title" : "column_title_light"
            }`}
          >
            Comments:
          </h3>
          <div
            className={`${
              theme == "dark" ? "comments-section" : "comments-section-light"
            }`}
          >
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`${theme == "dark" ? "comment" : "comment-light"}`}
                >
                  <p>{comment.content}</p>
                  <small>{new Date(comment.createdAt).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {!showInput ? (
            <button
              className="add-task-button"
              onClick={() => setShowInput(true)}
            >
              Add Comment
            </button>
          ) : (
            <div className="add-comment-section">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button
                className="add-task-button"
                onClick={() => {
                  handleAddComment(task.id, newComment);
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskInfo;
