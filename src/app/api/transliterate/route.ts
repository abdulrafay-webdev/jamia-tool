import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

export async function GET(req: NextRequest) {
  try {
    const models = await genAI.listModels();
    const modelInfo = models.map(model => ({
      name: model.name,
      supportedMethods: model.supportedGenerationMethods,
    }));
    return NextResponse.json({ availableModels: modelInfo });
  } catch (error: any) {
    console.error('List Models Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { names } = await req.json();

    if (!names || !Array.isArray(names) || names.length === 0) {
      return NextResponse.json({ error: 'Names must be a non-empty array' }, { status: 400 });
    }

    const systemInstruction = `You are a transliteration expert. Your task is to convert English names into phonetically correct Urdu script. Do not translate the meaning. For example, "Ali" should be "علی" and "Usman" should be "عثمان".
    Return the output as a simple JSON array of strings. For example, if the input is ["Ali", "Ahmed"], the output should be ["علی", "احمد"].
    If you receive an empty array, return an empty array.
    `;

    const prompt = `Transliterate the following English names to Urdu: ${JSON.stringify(names)}`;
    
    const result = await model.generateContent([systemInstruction, prompt]);
    const response = await result.response;
    let text = response.text();

    // Clean up the response from the model
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const transliteratedNames = JSON.parse(text);
      
      if (!Array.isArray(transliteratedNames) || transliteratedNames.length !== names.length) {
        throw new Error("Transliteration model returned an invalid format.");
      }

      return NextResponse.json({ transliteratedNames });
    } catch (e) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error("Could not parse transliteration response from AI model.");
    }

  } catch (error: any) {
    console.error('Transliteration Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
