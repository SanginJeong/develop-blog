import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const getPortfolioList = async () => {
  return await api.get('/portfolio');
}

export const useGetPortfolioListQuery = () => {
  return useQuery({
    queryKey: ["getPortfolioList"],
    queryFn: getPortfolioList,
    select: (result) => result.data,
  })
}