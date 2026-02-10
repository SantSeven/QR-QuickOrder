
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartPairing = async (dishName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Recomienda un maridaje perfecto de bebida o guarnición para el plato "${dishName}" en un restaurante de lujo. Sé breve (máximo 15 palabras).`,
    });
    return response.text || "Combina perfectamente con un vino blanco seco.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nuestro chef recomienda maridar esto con una ensalada de temporada.";
  }
};
