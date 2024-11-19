import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const getPostList = async() => {
  return await api.get('/post');
}

export const useGetPostListQuery = () => {
  return useQuery({
    queryKey : ['getPostList'],
    queryFn : getPostList,
    select : (result) => result.data,
  })
}