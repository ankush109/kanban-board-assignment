import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { ENDPOINTS } from "../endpoint";


export const addComment = async ({ taskData }:any) => {
  const response = await api.post(ENDPOINTS.ADDCOMMENT(taskData), {
    comment: taskData.comment,
  });
  return response.data;
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