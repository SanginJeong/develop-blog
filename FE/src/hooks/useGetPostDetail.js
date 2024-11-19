import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const getPostDetail = async(id) => {
  return await api.get(`/post/${id}`);
}

export const useGetPostDetailQuery = (id) => {
  return useQuery({
    queryKey : ['getPostDetail', id],
    queryFn : ()=>getPostDetail(id),
    select : (result) => result.data,
  })
}