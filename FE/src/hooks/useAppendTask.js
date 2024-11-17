import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const appendTask = async({title}) => {
  return await api.post('/task',{title});
}

export const useAppendTaskQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : appendTask,
    onSuccess : (data) => {
      queryClient.invalidateQueries(['getTaskList']);
    },
    onError : (error) => {
      console.log('실패', error);
    }
  })
}