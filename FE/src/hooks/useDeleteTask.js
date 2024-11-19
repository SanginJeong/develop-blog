import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const deleteTask = async ({_id}) => {
  return await api.delete(`/task/${_id}`);
}

export const useDeleteTaskQuery = (setErrorMessage, setErrorModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : deleteTask,
    onSuccess : () => {
      queryClient.invalidateQueries(['getTaskList']);
    },
    onError : (error) => {
      setErrorMessage(error.message);
      setErrorModal(true);
    }
  })
}