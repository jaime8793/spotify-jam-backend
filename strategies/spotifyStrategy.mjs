import passport from "passport";
import { Strategy } from "passport-spotify";
import { SpotifyUser } from "../mongoose/schema/spotify-user.mjs";


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    //cool
    console.log("Inside deserializer");
    const findUser = await SpotifyUser.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

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
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await SpotifyUser.findOne({ id: profile.id });
      } catch (error) {
        console.log(
          `This is an error in the spotify Strategy find user`,
          error
        );
        return done(error, null);
      }
      try {
        if (!findUser) {
         const newSpotifyUser = new SpotifyUser({
            display_name: profile.display_name,
            id: profile.id,
          });
          const newSavedUser = await newSpotifyUser.save();
          return done(null, newSavedUser);
        }
        return done(null, findUser);
      } catch (error) {
        console.log(
          `This is an error in the spotify Strategy save user`,
          error
        );
        return done(error, null);
      }
    }
  )
);
