import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGeminiPost(topic) {
    try {
        const prompt = `Write a twitter(x) community post (50-150 characters) about ${topic}. Use a fun, engaging tone with emojis and 1-2 hashtags. Include a call-to-action to comment`;

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
  outputPath = "gemini-generated-image.png"
) {
  try { 
    const imagePrompt = `Create an engaging visual representation of  ${prompt} as a meme or funny content`;

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

    return { success: true, imagePath: outputPath };
  } catch (error) {
    console.error("Error generating image:", error.message);
    return { success: false, error: error.message };
  }
}
