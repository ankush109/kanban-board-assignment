import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import { ENDPOINTS } from "../endpoint";

export const getComment = async (taskId:number) => {
    const response = await api.get(ENDPOINTS.GETCOMMENTS(taskId))
    return response.data;
  };
  
  
  export const useGetCommentsQuery = (taskId:number) =>
    useQuery({
      queryKey: ["get-task-comments"],
      queryFn: () => getComment(taskId),
      select: (data) => {
        const res = data;
        return res;
      },
    });
  