import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
interface MovieFormProps {
  submitLabel: string;
}

export const MovieForm = ({ submitLabel }: MovieFormProps) => {
  const movieFormSchema = z.object({
    title: z.string().max(1),
    year: z.number(),
    rated: z.string(),
    runtime: z.number(),
    genres: z.array(z.string()),
    directors: z.array(z.string()),
    cast: z.array(z.string()),
    writers: z.array(z.string()),
    plot: z.string(),
    fullplot: z.string(),
    poster: z.string(),
  });
  const { handleSubmit, register } = useForm<z.infer<typeof movieFormSchema>>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof movieFormSchema>> = (data) => {
    console.log(data);
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 200 }, (_, i) => currentYear - i);
  return (
    <div className="w-full ">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Released Year" />
        </SelectTrigger>
        <SelectContent className=" bg-slate-400 ">
          {years.map((year) => (
            <SelectItem value={year.toString()} className="w-7">
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input placeholder="Enter Title Here" />
            </Field>
            <Field>
              <FieldLabel>Released Year</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="newsletter">
                Subscribe to the newsletter
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </div>
  );
};
