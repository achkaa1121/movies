import { Router } from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  editMovie,
} from "../controllers/movieController";

const router = Router();
router.post("/create-movie", createMovie);
router.post("/edit-movie", editMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);

export default router;
