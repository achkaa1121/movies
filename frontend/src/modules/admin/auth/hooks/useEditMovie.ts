import { useMutation } from "@tanstack/react-query";
import type { IMovieForm } from "../../movies/MovieForm";
import axios from "axios";

export const useEditMovie = () => {
  return useMutation({
    mutationFn: (data: IMovieForm) => {
      return axios.post("http://localhost:3000/api/movies/edit-movie", {
        data,
      });
    },
  });
};
