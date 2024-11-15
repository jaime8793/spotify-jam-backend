import mongoose from "mongoose";
//import { type } from "os";

const SpotifyUserSchema = new mongoose.Schema({
  display_name: {
    type: mongoose.Schema.Types.String,
    //required: true,
  },
  id: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
});

export const SpotifyUser = mongoose.model("User", SpotifyUserSchema);
