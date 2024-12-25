import { URL } from "../models/url.model.js";
import { nanoid } from "nanoid"; // Assuming you have nanoid installed for generating unique IDs

export const generatenewShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const ShortID = nanoid(8); // Generate a unique short ID with 8 characters

    if (!url) {
      return res.status(400).json({ error: "URL is required!!" });
    }

    const createdURL = await URL.create({
      shortId: ShortID,
      redirectURL: url,
      visitHistory: [],
    });

    if (!createdURL) {
      return res.status(402).json("ShortUrl not created");
    }

    return res.status(200).json({ id: ShortID });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({ error: "Error in creating url" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const ShortID = req.params.shortId;

    if (!ShortID) {
      return res.status(404).json("shortId is required");
    }

    const entry = await URL.findOneAndUpdate(
      { shortId: ShortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: "Error in redirecting url" });
  }
};

export const getUrlAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;
    if (!shortId) {
      return res.status(404).json("shortId is required");
    }

    const fetchedData = await URL.findOne({ shortId });

    if (!fetchedData) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({ visits: fetchedData.visitHistory.length });
  } catch (error) {
    console.log("error: ",error)
    return res.status(500).json({ error: "Error in getting url analytics" });
  }
};
