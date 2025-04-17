const { TwitterApi } = require("twitter-api-v2");
const fs = require('fs');
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
  const { content, imagePath } = req.body;

  if (!content || content.length === 0) {
    return res.status(400).json({ error: "Tweet content is required." });
  }

  try {
    let mediaId;

    // If an image path was provided, upload it first
    if (imagePath && fs.existsSync(imagePath)) {
      // Read the image file
      const imageBuffer = fs.readFileSync(imagePath);

      const mediaUpload = await twitterClient.v1.uploadMedia(imageBuffer, {
        mimeType: "image/png", // image type png or jpg
      });
      mediaId = mediaUpload;
      console.log("Media uploaded with ID:", mediaId);
    }
 
    const tweetOptions = { text: content };

    // if image add to post
    if (mediaId) {
      tweetOptions.media = { media_ids: [mediaId] };
    }
    

    const result = await twitterClient.v2.tweet(tweetOptions);
    console.log("Tweet posted:", result);
    res
      .status(200)
      .json({
        success: true,
        tweetUrl: `https://twitter.com/user/status/${result.data.id}`,
      });
  } catch (error) {
    console.error("Error posting to Twitter:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;