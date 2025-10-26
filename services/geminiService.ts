import { GoogleGenAI, Type } from "@google/genai";
import type { PromptOption, CompanyData, GeneratedEmail } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please add it to your environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

function constructFinalPrompt(systemPrompt: string, companyData: CompanyData): string {
    let finalPrompt = systemPrompt;
    finalPrompt = finalPrompt.replace('{company_name}', companyData.name);
    finalPrompt = finalPrompt.replace('{contact_person}', companyData.contactPerson);
    finalPrompt = finalPrompt.replace('{company_description}', companyData.description);
    return finalPrompt;
}

export const generateEmail = async (promptOption: PromptOption, companyData: CompanyData): Promise<GeneratedEmail> => {
    
    const finalPrompt = constructFinalPrompt(promptOption.systemPrompt, companyData);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: finalPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    subject: {
                        type: Type.STRING,
                        description: "A compelling, human-like email subject line, max 10 words. Must not sound like spam."
                    },
                    body: {
                        type: Type.STRING,
                        description: "The full email body, formatted as plain text. Use '\\n' for line breaks. Must be personalized and professional."
                    }
                },
                required: ["subject", "body"]
            },
            temperature: 0.8,
        }
    });

    const jsonString = response.text;
    
    try {
        const parsed: GeneratedEmail = JSON.parse(jsonString);
        return parsed;
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonString);
        throw new Error("The AI returned an invalid response format.");
    }
};
