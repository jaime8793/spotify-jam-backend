import mongoose from "mongoose";
//import { type } from "os";

const SpotifyUserSchema = new mongoose.Schema({
  displayName: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  id: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
});

export const SpotifyUser = mongoose.model("User", SpotifyUserSchema);
