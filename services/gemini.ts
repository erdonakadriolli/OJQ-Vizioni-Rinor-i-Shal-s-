
import { GoogleGenAI } from "@google/genai";

export const generateProjectPitch = async (title: string, keywords: string) => {
  // Always use the API key directly from process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a professional and inspiring NGO project description for a project titled "${title}". Use the following keywords: ${keywords}. The tone should be empathetic, professional, and highlight the social impact. Return a paragraph about 100 words long.`,
    });
    
    // The response.text property directly returns the generated string
    return response.text || "Failed to generate pitch. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI generation currently unavailable. Please check your configuration.";
  }
};
