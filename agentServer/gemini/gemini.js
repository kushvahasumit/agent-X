import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import dotenv from "dotenv";
import path from "path"
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGeminiPost(topic) {
    try {
        const prompt = `Imagine you're a witty, relatable person on Twitter writing a short, engaging community post about "${topic}". Keep it casual and fun — use 1-2 emojis, a conversational tone, and add 1-2 relevant hashtags. Make it feel personal, like you're talking to your followers. End with a question or call-to-action that encourages replies. Keep it between 50–150 characters.`;

        const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ parts: [{ text: prompt }] }],
        });

        console.log(response.text);
        const texts = response.text;
        if (!texts) {
            throw new Error("No content generated");
        }
        
        return texts;
    } catch (error) {
        console.error("Error generating post:", error.message);
        return "Failed to generate post. Try again!";
    }  
}
 

export async function generateGeminiImage(
  prompt,
  outputPath  = path.join("public/images", "gemini-generated-image.png")
) {
  try { 
    const imagePrompt = `Create a fun and visually engaging image that represents "${prompt}" in a meme-style or humorous format. Use vibrant colors, a playful tone, and make sure it grabs attention quickly — like something you'd see shared widely on social media. The image should be creative, funny, or clever, and make people want to comment or share.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: imagePrompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    let savedImage = false;

    for (const part of response.candidates[0].content.parts) {
      // Handle text responses
      if (part.text) {
        console.log(part.text);
      }
      // Handle image data
      else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(outputPath, buffer);
        console.log(`Image saved as ${outputPath}`);
        savedImage = true;
      }
    }

    if (!savedImage) {
      throw new Error("No image was generated");
    }

    return {
      success: true,
      imagePath: outputPath,
      imageUrl: `http://localhost:4000/images/gemini-generated-image.png`,
    };
  } catch (error) {
    console.error("Error generating image:", error.message);
    return { success: false, error: error.message };
  }
}
