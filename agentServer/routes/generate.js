const express = require('express');
const router = express.Router();
const {generateGeminiPost} = require('../gemini/gemini')
const {generateGeminiImage} = require('../gemini/gemini')

router.post('/',async (req,res)=>{
    const {topic} = req.body;

    if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
    }

    try {
      // const post = await generateGeminiPost(topic);
      // const image = await generateGeminiImage(topic); 

      // console.log("my post", post);
      // console.log("my image", image);
      // res.json({post, image });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Something went wrong with Gemini API" });
    }
})


module.exports = router;