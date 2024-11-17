import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const updateTaskTitle = async ({id, title}) => {
  return api.put(`/task/title/${id}`, {title});
}

export const useUpdateTaskTitleQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : updateTaskTitle,
    onSuccess : () => {
      queryClient.invalidateQueries(['getAuth']);
    },
    onError : (error) => {
      console.log('업데이트 실패', error.message);
    }
  })
}