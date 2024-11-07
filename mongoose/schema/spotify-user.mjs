import mongoose from "mongoose";
//import { type } from "os";

const SpotifyUserSchema = new mongoose.Schema({
  display_name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model("User", SpotifyUserSchema);
