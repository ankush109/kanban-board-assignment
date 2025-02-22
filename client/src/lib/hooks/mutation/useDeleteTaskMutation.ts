import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { ENDPOINTS } from "../endpoint";

export const deleteTask = async (taskId: number) => {
    const response = await api.delete(ENDPOINTS.DELETE(taskId));
    return response.data;
  };
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