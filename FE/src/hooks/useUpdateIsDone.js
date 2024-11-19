import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const updateIsDone = async({ _id} ) => {
  return await api.put(`/task/${_id}`);
}

export const useUpdateIsDoneQuery = (setErrorMessage,setErrorModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : updateIsDone,
    onSuccess : () => {
      queryClient.invalidateQueries(['getAuth']);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setErrorModal(true); 
    }
  })
}