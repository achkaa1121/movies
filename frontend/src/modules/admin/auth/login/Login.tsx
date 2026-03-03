import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type ILoginInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const { user } = useAuth();
  const { handleSubmit, register } = useForm<ILoginInputs>();

  if (user) {
    return <Navigate to={"/admin/create-movie"} />;
  }

  const onSubmit: SubmitHandler<ILoginInputs> = data => console.log(data);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" {...register("email")} />
        <Input type="password" {...register("password", { required: true })} />

        <Button type="submit" variant={"outline"}>
          Login
        </Button>
      </form>
    </div>
  );
};
