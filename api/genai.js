import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
      config: {
        systemInstruction: "Ju jeni Derdo, asistent i VRSH. Përgjigjuni gjithmonë në gjuhën shqipe, miqësor dhe pozitiv.",
        temperature: 0.7,
      }
    });

    res.status(200).json({ text: response.text || "Më falni, ka ndodhur një gabim." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "Gabim në lidhje!" });
  }
}