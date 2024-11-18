import { Router } from "express";
import SpotifyWebApi from "spotify-web-api-js";
import {}

const route = Router();
const spotifyApi = new SpotifyWebApi();

route.get(`/api/v1/spotify`, (req,res) => {
    
})