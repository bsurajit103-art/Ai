
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBlogPostContent = async (prompt: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a compelling, professional blog post about: ${prompt}. Use markdown for headers and structure. Keep it under 600 words.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw error;
  }
};

export const generatePostSummary = async (content: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following blog post content in 3 concise bullet points:\n\n${content}`,
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary.";
  }
};

export const generatePostImage = async (prompt: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `A high-quality, professional, cinematic blog cover photo for an article about: ${prompt}. Minimalist, aesthetic, suitable for a modern blog.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const suggestTitles = async (topic: string): Promise<string[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 5 catchy, high-engagement blog titles for the topic: ${topic}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    const titles = JSON.parse(response.text || "[]");
    return titles;
  } catch (error) {
    console.error("Error suggesting titles:", error);
    return [];
  }
};
