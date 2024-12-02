import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../utils/api';

const deletePortfolio = async (id) => {
  return await api.delete(`/portfolio/${id}`);
}

export const useDeletePortfolioQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries(['getPortfolioList']);
    },
    onError: (error) => {
      console.log('실패', error.message);
    }
  })
}