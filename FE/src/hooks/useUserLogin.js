import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";

const userLogin = async ({email, password}) => {
  return await api.post('/user', {email, password});
}

export const useUserLoginQuery = () => {
  return useMutation({
    mutationFn : userLogin,
    onSuccess : (data) => {
      console.log("로그인 성공", data);
      
    },
    onError : (error) => {
      console.log("로그인 실패", error);
      
    }
  })
}
