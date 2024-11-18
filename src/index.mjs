import express, { application } from "express";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import "../strategies/spotifyStrategy.mjs";

const app = express();
const port = 3003;

mongoose
  .connect("mongodb://localhost/spotify-jam")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(`this is the database error:`, err));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(`/`, (req, res) => {
  res.send(`Welcome to spotify`);
});
app.get(`/api/v1/signIn`, (req, res) => {
  res.send(`Welcome to spotify Redirect`);
});

app.get("/api/auth/spotify", passport.authenticate("spotify"));
app.get(
  "/api/spotify/redirect",
  passport.authenticate("spotify", { failureRedirect: `/api/v1/signIn` }),
  (req, res) => {
    //console.log(User);
    console.log("Authorization Code:", req.query.code);
    res.send(req.user).status(200);
  }
);

app.get(`api/status/spotify`, (req, res) => {
  return req.user ? res.send(res.user) : res.sendStatus(401)
})

app.listen(port, () => {
  console.log("Server running on port:", port);
});
