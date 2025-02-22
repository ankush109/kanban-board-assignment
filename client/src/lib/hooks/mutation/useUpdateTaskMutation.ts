import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { ENDPOINTS } from "../endpoint";

export const updateTask = async (taskData:any) => {
  const response = await api.patch(ENDPOINTS.UPDATETASK(taskData.id), taskData);
  return response.data;
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