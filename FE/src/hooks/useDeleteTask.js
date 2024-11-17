import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const deleteTask = async ({_id}) => {
  return await api.delete(`/task/${_id}`);
}

export const useDeleteTaskQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : deleteTask,
    onSuccess : (data) => {
      console.log('삭제성공', data);
      queryClient.invalidateQueries(['getTaskList']);
    },
    onError : (error) => {
      console.log('실패', error);
    }
  })
}