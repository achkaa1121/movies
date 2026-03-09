import { getMovieById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import type { IMovieForm } from "../../movies/MovieForm";

export const useGetMovieID = (id: string) => {
  return useQuery<IMovieForm>({
    queryKey: ["getMovieById", id],
    queryFn: () => getMovieById(id),
    enabled: Boolean(id),
  });
};
