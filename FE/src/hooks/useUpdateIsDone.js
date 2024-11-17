import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const updateIsDone = async({ _id} ) => {
  return await api.put(`/task/${_id}`);
}

export const useUpdateIsDoneQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : updateIsDone,
    onSuccess : (data) => {
      console.log('업데이트 성공', data);
      queryClient.invalidateQueries(['getAuth']);
    },
    onError: (error) => {
      console.log('업데이트 실패', error.message);
    }
  })
}