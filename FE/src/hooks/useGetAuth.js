import { useQuery } from "@tanstack/react-query";

const getAuth = () => {
  const token = sessionStorage.getItem('token');
  return token ? {authenticated: true} : {authenticated: false}
}

export const useGetAuthQuery = () => {
  return useQuery({
    queryKey: ['getAuth'],
    queryFn: getAuth,
    staleTime: Infinity,
  })
}

