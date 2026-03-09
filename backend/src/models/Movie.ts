import { Schema, model } from "mongoose";

const imdbSchema = new Schema(
  {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  { _id: false },
);

const viewerSchema = new Schema(
  {
    rating: { type: Number },
    numReviews: { type: Number },
  },
  { _id: false },
);

const tomatoesSchema = new Schema(
  {
    viewer: { type: viewerSchema },
    fresh: { type: Number },
    rotten: { type: Number },
  },
  { _id: false },
);

const awardsSchema = new Schema(
  {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
  },
  { _id: false },
);

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genres: { type: [String], default: [] },
    rating: { type: Number, min: 0, max: 10 },
  },
  {
    collection: "movies",
  },
);

const Movie = model("Movie", movieSchema);

export default Movie;
