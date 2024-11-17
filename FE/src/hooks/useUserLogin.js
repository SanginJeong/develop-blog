import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
import {useNavigate} from 'react-router';
const userLogin = async ({email, password}) => {
  const response = await api.post('/user', {email, password});
  return response.data
}

export const useUserLoginQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : userLogin,
    onSuccess : (data) => {
      console.log("로그인 성공", data);
      
      if(data.token) {
        sessionStorage.setItem('token', data.token);
        queryClient.invalidateQueries(['getAuth']);
      }
      navigate('/');
    },
    onError : (error) => {
      console.log("로그인 실패", error);
    }
  })

}
