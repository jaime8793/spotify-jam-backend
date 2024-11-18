import { Router } from "express";
import SpotifyWebApi from "spotify-web-api-node";
const route = Router();

const spotifyApi = new SpotifyWebApi();

route.get(`/`, (req, res) => {
  console.log("This is the req sessioon", req.session);
  spotifyApi.setAccessToken(req.session.accessToken);
  spotifyApi.getMe().then(
    function (data) {
      console.log("Some information about the authenticated user", data.body);
      return data ? res.json(data.body).status(200) : res.sendStatus(401);
    },
    function (err) {
      console.log("Something went wrong in the get spotify function!", err);
    }
  );
  // res.send(data.body);
});

export default route;
