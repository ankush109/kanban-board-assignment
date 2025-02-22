"use client";

import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useTheme } from "../provider/ThemeProvider";
import {
  usedeleteCommentMutation,
  getCommentTasks,
  useAddCommentMutation,
} from "@/api/task";
import toast from "react-hot-toast";
import { Comment, TaskProps } from "../types/types";
import { Delete } from 'lucide-react';
const TaskInfo: React.FC<TaskProps> = ({ task, onClose }) => {
  const { theme } = useTheme();
  const { mutate: addComment } = useAddCommentMutation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { data, refetch, isLoading } = getCommentTasks(task.id);
  const { mutate: deleteComment, isSuccess } = usedeleteCommentMutation();
  const handleAddComment = (taskId: any, comment: any) => {
    console.log(taskId, "taskid");
    if (comment.trim() == "") return toast.error("comment cannot be empty!");
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
  const deleteCoommet = async (commentId: any) => {
    deleteComment(commentId, {
      onSuccess: () => {
        toast.success("comment Deleted successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Error occurred while deleting");
      },
    });
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
          <div className="task-info">
            <label>
              <span className="title-info">{task.name}</span>
            </label>
            <p className="description">
              Created at {new Date(task.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
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
            ({comments.length}) Comments
          </h3>

          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <div
              className={`${
                theme == "dark" ? "comments-section" : "comments-section-light"
              }`}
            >
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`${
                      theme == "dark" ? "comment" : "comment-light"
                    }`}
                  >
                    <p>{comment.content}</p>
                    <div className="button-task-info">
                    <small>
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                    <div className="delete-icon" onClick={() => deleteCoommet(comment.id)}>
                    <Delete color="red"/>
                    </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          )}

          <div className="">
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
      </div>
    </Modal>
  );
};

export default TaskInfo;
