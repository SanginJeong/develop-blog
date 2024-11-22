import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
import {useNavigate, useLocation} from 'react-router';


const userLogin = async ({email, password}) => {
  const response = await api.post('/user', {email, password});
  return response.data
}

export const useUserLoginQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const {state} = location;

  return useMutation({
    mutationFn : userLogin,
    onSuccess : (data) => {
       
      if(data.token) {
        sessionStorage.setItem('token', data.token);
        queryClient.invalidateQueries(['getAuth']);
      }
      
      navigate(state.prevURL);
    },
    onError : (error) => {
      console.log("로그인 실패", error);
    }
  })

}
