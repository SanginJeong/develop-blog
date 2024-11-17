import { useQuery } from "@tanstack/react-query";
import api from '../utils/api';

const getTaskList = async() => {
  return await api.get('/task'); 
}

export const useGetTaskListQuery = () =>{
  return useQuery({
    queryKey : ['getTaskList'],
    queryFn : getTaskList,
    staleTime : 300000,
  })
}
