import express from "express";
import passport from "passport";
import "../strategies/spotifyStrategy.mjs";

const app = express();
const port = 3000;

app.use(passport.initialize());

app.get("/api/auth/spotify", passport.authenticate("spotify"));
app.get(
  "/api/spotify/redirect",
  passport.authenticate("spotify"),
  (req, res) => {
    res.sendStatus(200);
  }
);

app.listen(port, () => {
  console.log("Server running on port:", port);
});
