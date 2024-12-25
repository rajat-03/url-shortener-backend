import express from "express";
import { generatenewShortUrl, getUrlAnalytics, redirectUrl } from "../controllers/url.controller.js";

const route = express.Router();

route.post("/", generatenewShortUrl);
route.get("/:shortId", redirectUrl);
route.get("/analytics/:shortId", getUrlAnalytics);

export default route;
