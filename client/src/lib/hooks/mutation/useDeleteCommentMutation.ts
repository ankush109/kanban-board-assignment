import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";
import { ENDPOINTS } from "../endpoint";

export const deleteComment = async (commentId:number) => {
    const response = await api.delete(ENDPOINTS.DELETECOMMENT(commentId));
    return response.data;
  };
  

  export const usedeleteCommentMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteComment,
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries({ queryKey: ["get-my-tasks"] });
      },
      onError: (error) => {
        console.error("Error updating task:", error);
      },
    });
  };
  