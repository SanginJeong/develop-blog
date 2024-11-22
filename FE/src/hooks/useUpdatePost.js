import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const updatePost = async(postId,title,content,category) => {
  return await api.put(`/post/${postId}`, {title,content,category});
}

export const useUpdatePostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : (data) => updatePost(data.postId,data.title,data.content,data.category),
    onSuccess : (data) => {
      // queryClient.invalidateQueries(['getPostDetail', data.postId]);
    },
    onError: (error) => {
      console.log('변경실패', error.message);
    }
  })
} 