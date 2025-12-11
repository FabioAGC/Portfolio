import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client safely
let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn("API_KEY is missing. AI features will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

export const enhanceBio = async (currentBio: string): Promise<string> => {
  if (!ai) {
    throw new Error("AI service is not configured (missing API Key).");
  }

  try {
    const prompt = `
      You are an expert personal branding consultant. 
      Rewrite the following professional bio to be more engaging, concise, and professional. 
      Keep the tone confident but humble.
      If the input is empty or very short, generate a generic but professional placeholder bio for a software engineer.
      
      Current Bio: "${currentBio}"
      
      Output strictly the rewriten bio text only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error enhancing bio:", error);
    throw error;
  }
};
