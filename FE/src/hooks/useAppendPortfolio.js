import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const appendPortfolio = async ({title,webURL,gitURL}) => {
  return api.post('/portfolio', {title,webURL,gitURL});
}

export const useAppendPortfolioQuery = () => {
  const queryClient= useQueryClient();
  return useMutation({
    mutationFn: appendPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries(['getPortfolioList']);
    },
    onError: (error) => {
      console.log("실패", error.message);
    }
  })
}