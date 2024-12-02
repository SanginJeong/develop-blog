import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const getProfile = async() => {
  return api.get('/profile');
}

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    select: (result) => result.data,
  })
}