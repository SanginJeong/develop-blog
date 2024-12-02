import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../utils/api';

const updatePortfolio = async({id,title,webURL,gitURL}) => {
  return await api.put(`/portfolio/${id}`,{title,gitURL,webURL});
}

export const useUpdatePortfolioQuery = () => {
  const queryClient= useQueryClient();
  return useMutation({
    mutationFn: updatePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries(['getPortfolioList']);
    },
    onError: (error) => {
      console.log(error);
      console.error('실패', error.message);
    }
  })
}