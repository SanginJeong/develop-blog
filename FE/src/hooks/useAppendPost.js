import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../utils/api';

const appendPost = async({title,category,content,image}) => {
  return await api.post('/post', {title,category,content,image});
}

export const useAppendPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : appendPost,
    onSuccess : (data) => {
      queryClient.invalidateQueries(['getPostList']);
    },
    onError : (error) => {
      console.log(error.message);
    }
  })
}