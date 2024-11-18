import { Router } from "express";
import SpotifyWebApi from "spotify-web-api-js";

const route = Router();
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(req.session.accessToken);

route.get(`/api/v1/spotify`, (req, res) => {});
