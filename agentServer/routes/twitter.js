const { TwitterApi } = require("twitter-api-v2");
const fs= require("fs")
const express = require("express");
const router = express.Router();
require("dotenv").config();

const twitterClient = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

router.post("/post-to-twitter", async (req, res) => {
  const { content, imagePath, filter } = req.body;

  if (!filter?.text && !filter?.image) {
    return res
      .status(400)
      .json({ error: "At least one of text or image must be selected." });
  }

  try {
    let mediaId = null;

    // Handle image upload if filter.image is true
    if (filter.image && imagePath && fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      const mediaUpload = await twitterClient.v1.uploadMedia(imageBuffer, {
        mimeType: "image/png",
      });
      mediaId = mediaUpload;
    }

    if (filter.text && !filter.image) {
      // post only text
      const result = await twitterClient.v2.tweet({ text: content });
      console.log("Tweet posted (text only):", result);
      return res.status(200).json({
        success: true,
        tweetUrl: `https://twitter.com/user/status/${result.data.id}`,
      });
    }

    // post only image
    if (!filter.text && filter.image && mediaId) {
      const result = await twitterClient.v2.tweet({
        text: " ",
        media: { media_ids: [mediaId] },
      });
      console.log("Tweet posted (image only):", result);
      return res.status(200).json({
        success: true,
        tweetUrl: `https://twitter.com/user/status/${result.data.id}`,
      });
    }

    // post both img and text
    if (filter.text && filter.image && mediaId) {
      const result = await twitterClient.v2.tweet({
        text: content,
        media: { media_ids: [mediaId] },
      });
      console.log("Tweet posted (text + image):", result);
      return res.status(200).json({
        success: true,
        tweetUrl: `https://twitter.com/user/status/${result.data.id}`,
      });
    }

    // If image is missing and required
    if (filter.image && !mediaId) {
      return res
        .status(400)
        .json({ error: "Image was selected but could not be uploaded." });
    }

    return res.status(400).json({ error: "Unhandled posting condition." });
  } catch (error) {
    console.error("Error posting to Twitter:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;