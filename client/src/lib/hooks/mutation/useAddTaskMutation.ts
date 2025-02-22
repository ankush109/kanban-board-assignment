import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { ENDPOINTS } from "../endpoint";


export const addTask = async (taskData:any) => {
  const response = await api.post(ENDPOINTS.ADDTASK(),taskData);
  return response.data;
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