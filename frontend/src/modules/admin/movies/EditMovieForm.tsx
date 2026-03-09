import { MovieForm, type MovieFormProps } from "./MovieForm";

export const EditMovieForm = ({ id }: MovieFormProps) => {
  return <MovieForm submitLabel="Save Changes" id={id} />;
};
