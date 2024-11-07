import passport from "passport";
import { Strategy } from "passport-spotify";

export default passport.use(
  new Strategy(
    {
      clientID: "d9147a1690034f6084974cf8650f8f9e",
      clientSecret: "490cb023a31f41d1bb4c7e65c1a598e9",
      callbackURL: "http://localhost:3000/api/spotify/redirect",
      scope: [
        "playlist-read-private",
        "user-top-read",
        "user-follow-read",
        " user-read-recently-played",
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
