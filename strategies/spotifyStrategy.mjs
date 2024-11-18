import passport from "passport";
import { Strategy } from "passport-spotify";
import { SpotifyUser } from "../mongoose/schema/spotify-user.mjs";

passport.serializeUser((user, done) => {
  done(null, user.displayName);
});

passport.deserializeUser(async (displayName, done) => {
  try {
    console.log("Inside deserializer");
    const findUser = await SpotifyUser.findOne({ displayName: displayName });
    return findUser ? done(null, findUser) : done(null, null);
  } catch (err) {
    console.log(`This is the desarilizer error`, err);
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: "d9147a1690034f6084974cf8650f8f9e",
      clientSecret: "490cb023a31f41d1bb4c7e65c1a598e9",
      callbackURL: "http://localhost:3003/api/spotify/redirect",
      scope: [
        "playlist-read-private",
        "user-top-read",
        "user-follow-read",
        "user-read-recently-played",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      console.log(profile);
      console.log(`This is the access token:`, accessToken);
      try {
        findUser = await SpotifyUser.findOne({
          displayName: profile.displayName,
        });
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
            displayName: profile.displayName,
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


