import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const deletePost = async ({idList}) => {
  return await api.delete('/post', idList);
}

export const useDeletePostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['getPostList']);
    },
    onError: (error) => {
      console.log('게시물 삭제 실패' , error.message);
    }
  })
}