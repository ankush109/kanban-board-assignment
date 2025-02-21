import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

export const API = axios.create({
  baseURL: `http://localhost:5001/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});


const api = API;
export const getAlltasks = async () => {
  const response = await api.get(
    `/task`
  );

  return response.data;
};
export const addTask = async (taskData) => {
    const response = await api.post(`/task/create`, taskData);
    return response.data;
  };


  export const addComment = async (taskData) => {
    console.log(taskData.taskId,"taskiud")
    const response = await api.post(`/task/addComment/${taskData.taskId}`, taskData.comment);
    return response.data;
  };
  export const getComment = async(taskId)=>{
    const response = await api.get(`/task/comment/${taskId}`)
    return response.data;
  }

  export const updateTask = async(taskData) =>{
    const response = await api.patch(`/task/${taskData.id}`, taskData);
    return response.data;
  }
  export const deleteTask = async(taskId) =>{
    const response = await api.delete(`/task/${taskId}`);
    return response.data;
  }
  export const usedeleteTaskMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteTask,
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries({ queryKey: ["get-my-tasks"] });
      },
      onError: (error) => {
        console.error("Error updating task:", error);
      },
    });
  };

  export const useUpdateTaskMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: updateTask,
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries({ queryKey: ["get-my-tasks"] });
      },
      onError: (error) => {
        console.error("Error updating task:", error);
      },
    });
  };
  
  export const useAddTaskMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: addTask,
      onSuccess: (newTask) => {
        queryClient.invalidateQueries({ queryKey: ["get-my-tasks"] });
      },
      onError: (error) => {
        console.error("Error adding task:", error);
      },
    });
  };
  


  export const useAddCommentMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: addComment,
      onSuccess: (newTask) => {
        queryClient.invalidateQueries({ queryKey: ["get-my-tasks"] });
      },
      onError: (error) => {
        console.error("Error adding task:", error);
      },
    });
  };
  
export const getTasksQuery = () =>
  useQuery({
    queryKey: ["get-my-tasks"],
    queryFn: () => getAlltasks(),
    select: (data) => {
      const res = data;
      return res;
    },
  });
  export const getCommentTasks = (taskId) =>
    useQuery({
      queryKey: ["get-task-comments"],
      queryFn: () => getComment(taskId),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  