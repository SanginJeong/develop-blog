import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const updateProfile = async (content) => {
  return api.post('/profile', {content});
}

export const useUpdateProfileQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["getProfile"]);
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
}