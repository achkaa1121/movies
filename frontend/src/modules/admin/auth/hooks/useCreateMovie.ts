import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { IMovieForm } from "../../movies/MovieForm";
export const useCreateMovie = () => {
  return useMutation({
    mutationFn: (data: IMovieForm) => {
      return axios.post("http://localhost:3000/api/movies/create-movie", {
        data,
      });
    },
  });
};
