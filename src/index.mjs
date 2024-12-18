import express, { application } from "express";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import spotifyRouter from "../routes/spotifyGet.mjs";
import cors from "cors";
import "../strategies/spotifyStrategy.mjs";

const app = express();
const port = 3003;

mongoose
  .connect("mongodb://localhost/spotify-jam")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(`this is the database error:`, err));

// Allow requests from the React frontend
app.use(
  cors({
    origin: "http://localhost:5174", // Replace with your frontend's URL
    credentials: true, // Allow cookies to be sent across origins
  })
);

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
app.use(`/api/v1/getUserSpotify`, spotifyRouter);

app.get(`/`, (req, res) => {
  console.log(`Home Visited`);
  res.redirect(`/api/auth/spotify`);
});

app.get("/api/auth/spotify", passport.authenticate("spotify"));
app.get(
  "/api/spotify/redirect",
  passport.authenticate("spotify"),
  (req, res) => {
    // console.log(`req.user.accessToken`, req.session.accessToken);
    req.session.accessToken = req.user.accessToken;

    console.log("Access Token:", req.session.accessToken);
    res.redirect("/api/status/spotify");
  }
);

app.get(`/api/status/spotify`, (req, res) => {
  console.log("req.user:", req.user); // Should include accessToken
  console.log("req.session.accessToken:", req.session.accessToken); // Should show accessToken

  if (!req.session.accessToken) {
    return res.status(401).json({ error: "No access token found in session" });
  }

  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Server running on port:", port);
});
