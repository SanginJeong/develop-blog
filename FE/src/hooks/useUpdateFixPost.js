import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const updateFixPost = async (postId) => {
  return api.put(`post/fix/${postId}`);
}

export const useUpdateFixPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFixPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['getPostList']);
    },
    onError: (error) => {
      console.log('고정실패', error.message);
    }
  })
}