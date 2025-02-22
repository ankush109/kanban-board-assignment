import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import { ENDPOINTS } from "../endpoint";

 const getAlltasks = async () => {
  const response = await api.get(ENDPOINTS.GETTASKS());

  return response.data;
};


export const useGetTaskQuery = () =>
    useQuery({
      queryKey: ["get-my-tasks"],
      queryFn: () => getAlltasks(),
      select: (data) => {
        const res = data;
        return res;
      },
    });