// import { google } from '@ai-sdk/google';
// import { GoogleAICacheManager } from '@google/generative-ai/server';
// import { generateText } from 'ai';

// const cacheManager : GoogleAICacheManager = new GoogleAICacheManager(
//   process.env.GOOGLE_GENERATIVE_AI_API_KEY as string
// );

// // As of August 23rd, 2024, these are the only models that support caching
// type GoogleModelCacheableId =
//   | 'models/gemini-1.5-flash-001'
//   | 'models/gemini-1.5-pro-001';

// const model: GoogleModelCacheableId = 'models/gemini-1.5-pro-001';

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     // Define the prompt to generate three open-ended and engaging questions
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     // Use caching to store and reuse content for better performance
//     const { name: cachedContent } = await cacheManager.create({
//       model,
//       contents: [
//         {
//           role: 'user',
//           parts: [{ text: prompt }],
//         },
//       ],
//       ttlSeconds: 60 * 5, // Cache for 5 minutes
//     });

//     // Generate text using the cached content
//     const { text: questions } = await generateText({
//       model: google(model, { cachedContent }),
//       prompt,
//     });

//     // Respond with the generated questions
//     return new Response(questions, {
//       headers: { 'Content-Type': 'text/plain' },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       // General error handling
//       console.error('An unexpected error occurred:', error);
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } else {
//       // Other types of errors if any
//       console.error('An unknown error occurred:', error);
//       throw error;
//     }
//   }
// }

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { google } from '@ai-sdk/google';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleAICacheManager } from "@google/generative-ai/server";
import { generateText } from "ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const cacheManager: GoogleAICacheManager = new GoogleAICacheManager(apiKey);

// As of August 23rd, 2024, these are the only models that support caching
type GoogleModelCacheableId = "models/gemini-1.5-flash-001" | "models/gemini-1.5-pro-001";

const model: GoogleModelCacheableId = "models/gemini-1.5-pro-001";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Define the POST handler
export async function POST(req: Request) {
  try {
    // Define the prompt to generate three open-ended and engaging questions
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Use caching to store and reuse content for better performance
    const { name: cachedContent } = await cacheManager.create({
      model,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      ttlSeconds: 60 * 5, // Cache for 5 minutes
    });

    // Generate text using the cached content
    const { text: questions } = await generateText({
      model: google(model, { cachedContent }),
      prompt,
    });

    // Return the generated questions as the response
    return new Response(questions, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    if (error instanceof Error) {
      // General error handling
      console.error("An unexpected error occurred:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Other types of errors if any
      console.error("An unknown error occurred:", error);
      throw error;
    }
  }
}



