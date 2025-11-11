import { GoogleGenAI, Type } from "@google/genai";
import { QuizCategory, QuizQuestion, ComponentData, QuizOption } from "../types";

// NOTE: This is a placeholder for a real API key which should be
// handled via environment variables in a real application.
// For this prototype, we assume `process.env.API_KEY` is available.
const API_KEY = process.env.API_KEY; 
if (!API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        questions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question_text: { type: Type.STRING },
                    question_image_url: { type: Type.STRING },
                    category_name: { type: Type.STRING },
                    difficulty: { type: Type.STRING, enum: ['easy', 'medium', 'hard'] },
                    type: { type: Type.STRING, enum: ['multiple_choice', 'true_false'] },
                    options: { 
                        type: Type.ARRAY, 
                        items: { 
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING },
                                image_url: { type: Type.STRING }
                            },
                            required: ['text']
                        } 
                    },
                    correct_answer: { type: Type.STRING }
                },
                required: ['question_text', 'category_name', 'difficulty', 'type', 'options', 'correct_answer']
            }
        }
    }
};


export const generateQuestions = async (documentText: string, categories: QuizCategory[]): Promise<Omit<QuizQuestion, 'id'>[] | null> => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is not configured.");
    }
    
    const categoryNames = categories.map(c => c.name).join(', ');

    const prompt = `
        Based on the following text from a technical document about electrical components, please generate 5 quiz questions.
        - Analyze the text to create relevant questions.
        - The questions should be a mix of "multiple_choice" (with 3 or 4 options) and "true_false" types.
        - Assign a difficulty level ('easy', 'medium', or 'hard') to each question.
        - For the 'category_name', choose the most relevant category from this list: [${categoryNames}].
        - For 'correct_answer' in multiple choice, it MUST exactly match the 'text' property of one of the objects in the 'options' array. For 'true_false', it MUST be either "True" or "False".
        - The 'question_image_url' and all 'image_url' fields in the options objects MUST be an empty string ("") as this is a text-only document.
        - Return ONLY the JSON object conforming to the provided schema.

        Here is the document text:
        ---
        ${documentText.substring(0, 30000)} 
        ---
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        if (!parsedJson.questions || !Array.isArray(parsedJson.questions)) {
            console.error("AI response is missing 'questions' array:", parsedJson);
            return null;
        }

        const categoryMap = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));

        const formattedQuestions = parsedJson.questions.map((q: any) => {
            const category_id = categoryMap.get(q.category_name.toLowerCase());
            if (!category_id) return null; // Skip if category is not valid

            return {
                question_text: q.question_text,
                category_id: category_id,
                difficulty: q.difficulty,
                type: q.type,
                options: q.options,
                correct_answer: q.correct_answer,
                question_image_url: q.question_image_url || undefined,
            };
        }).filter(Boolean); // Filter out any null entries

        return formattedQuestions as Omit<QuizQuestion, 'id'>[];

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate questions from the AI. Please check the console for more details.");
    }
};


export const generateQuestionsFromComponents = async (
  components: ComponentData[], 
  targetCategories: QuizCategory[], 
  numQuestions: number | 'auto'
): Promise<Omit<QuizQuestion, 'id'>[] | null> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured.");
  }
  
  const categoryNames = targetCategories.map(c => c.name).join(', ');

  const componentsContext = components.map(c => {
    return `
      Component:
      - Item Code: ${c.item_code}
      - Name: ${c.name}
      - Category: ${c.category}
      - Specifications: ${c.specifications || 'N/A'}
      - Technical Specs: ${c.technical_specs || 'N/A'}
      - Usage: ${c.usage_details || 'N/A'}
      - Safety Warnings: ${c.safety_warnings || 'N/A'}
      - Physical Image URL: ${c.physical_image_url || 'N/A'}
      - Schematic Image URL: ${c.schematic_image_url || 'N/A'}
      - Pinout Image URL: ${c.pinout_image_url || 'N/A'}
    `.trim();
  }).join('\n---\n');
  
  const questionCountInstruction = numQuestions === 'auto'
    ? 'generate as many high-quality and distinct questions as possible from the provided context'
    : `generate ${numQuestions} quiz questions`;

  const prompt = `
    Based on the following data for electrical components, please ${questionCountInstruction}.
    
    Instructions:
    1.  Create a mix of text-based questions and image-based questions.
    2.  For image-based questions (either the question itself or the options), you MUST populate the 'question_image_url' or the option's 'image_url' field with the corresponding URL from the component data. The question text should refer to the image (e.g., "Based on the image...").
    3.  For text-only questions and options, the 'question_image_url' and option 'image_url' fields MUST be an empty string ("").
    4.  All questions must belong to one of the categories in this list: [${categoryNames}]. Choose the most appropriate category for each question and set the 'category_name' field to that value.
    5.  The questions should be a mix of "multiple_choice" (with 3 or 4 options) and "true_false" types.
    6.  Assign a difficulty level ('easy', 'medium', or 'hard') to each question.
    7.  For 'correct_answer', it MUST exactly match the 'text' property of one of the objects in the 'options' array.
    8.  Return ONLY the JSON object conforming to the provided schema.

    Component Data Context:
    ---
    ${componentsContext.substring(0, 30000)} 
    ---
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7,
        },
    });
    
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    if (!parsedJson.questions || !Array.isArray(parsedJson.questions)) {
        console.error("AI response is missing 'questions' array:", parsedJson);
        return null;
    }
    
    const categoryMap = new Map(targetCategories.map(c => [c.name.toLowerCase(), c.id]));
    
    const formattedQuestions = parsedJson.questions.map((q: any) => {
        const categoryId = categoryMap.get(q.category_name?.toLowerCase());
        if (!categoryId) {
            console.warn(`AI returned an invalid category '${q.category_name}', skipping question.`);
            return null;
        }
        
        const options: QuizOption[] = q.options.map((opt: any) => ({
            text: opt.text,
            image_url: opt.image_url || undefined
        }));

        return {
            question_text: q.question_text,
            question_image_url: q.question_image_url || undefined,
            category_id: categoryId,
            difficulty: q.difficulty,
            type: q.type,
            options: options,
            correct_answer: q.correct_answer,
        };
    }).filter(Boolean);

    return formattedQuestions as Omit<QuizQuestion, 'id'>[];

  } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to generate questions from the AI. Please check the console for more details.");
  }
};