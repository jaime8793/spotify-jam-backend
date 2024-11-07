import express from "express";
import passport from "passport";
import "../strategies/spotifyStrategy.mjs";

const app = express();
const port = 3000;

app.use(passport.initialize());

app.listen(port, () => {
  console.log("Server running on port:", port);
});


