import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useCreateMovie } from "../auth/hooks/useCreateMovie";
import { useEditMovie } from "../auth/hooks/useEditMovie";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetMovieID } from "../auth/hooks/useGetMovieID";
import { useEffect } from "react";
export interface MovieFormProps {
  submitLabel?: string;
  id?: string;
}
export interface IMovieForm {
  title: string;
  year: number;
  genres: string[];
  rating: number;
}
export const MovieForm = ({ submitLabel, id }: MovieFormProps) => {
  const movieFormSchema = z.object({
    title: z.string().max(100),
    year: z.number().int().min(1827).max(2026),
    genres: z.array(z.string()),
    rating: z.number().min(0).max(10),
  });
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ];
  const { mutate: createMovie } = useCreateMovie();
  const { mutate: editMovie } = useEditMovie();
  const { handleSubmit, register, control, reset } = useForm<
    z.infer<typeof movieFormSchema>
  >({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      year: 2026,
      genres: [],
      rating: 0,
    },
  });
  const { data } = useGetMovieID(id!);
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);
  const onSubmit: SubmitHandler<z.infer<typeof movieFormSchema>> = (data) => {
    if (data) {
      editMovie(data);
    } else {
      createMovie(data);
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 200 }, (_, i) => currentYear - i);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input placeholder="Enter Title Here" {...register("title")} />
            </Field>
            <Field>
              <FieldLabel>Released Year</FieldLabel>
              <Controller
                control={control}
                name="year"
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Released Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Genres</FieldLabel>
              <Controller
                control={control}
                name="genres"
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-1">
                    {genres.map((genre) => {
                      const checked = field.value?.includes(genre);
                      return (
                        <div
                          key={genre}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(isChecked) => {
                              if (isChecked) {
                                field.onChange([...field.value, genre]);
                              } else {
                                field.onChange(
                                  field.value.filter((g) => g !== genre),
                                );
                              }
                            }}
                          />
                          <label className="text-sm font-medium">{genre}</label>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Rating</FieldLabel>
              <Input
                type="number"
                max={10}
                min={0}
                step={0.1}
                placeholder="IMDB Rating"
                {...register("rating", { valueAsNumber: true })}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button type="submit" className="w-full mt-4">
          {submitLabel}
        </Button>
      </form>
    </div>
  );
};
