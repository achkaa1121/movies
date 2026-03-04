import { Button } from "@/components/ui/button";

export const CreateMovieForm = () => {
  return (
    <form className="space-y-4">
      <Button type="submit" className="w-full">
        Create Movie
      </Button>
    </form>
  );
};
