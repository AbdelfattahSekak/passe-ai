import OpenAI from "openai";
import { inferenceSchema } from "../schemas/inferenceSchema";
import { logger } from "@/server/utils/logger";
import type { SearchFormData } from "~/types";

const config = useRuntimeConfig();
const openai = new OpenAI({ apiKey: config.server.OPENAI_API_KEY });

export async function generateTripInference(data: SearchFormData) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: generateSystemPrompt(),
        },
        {
          role: "user",
          content: generateUserPrompt(data),
        },
      ],
      response_format: inferenceSchema,
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error("OpenAI API error:", error);
    throw error;
  }
}

function generateUserPrompt({
  start,
  destination,
  nbStops,
}: SearchFormData): string {
  return `
    Plan a trip for me. Here are the details:
    Start Point: [${start}]
    Destination: [${destination}]
    Number of Stops: [${nbStops}]
    Start Date:[]
    End Date: []
    Group Type: []
    Activities Type: []
    Transportation Mode: []
    Preferences: []
    Provide a detailed itinerary with stops (including start and destination) and activities, formatted as a JSON object.
  `;
}

function generateSystemPrompt() {
  return "You are a highly specialized AI expert in trip and road trip planning. Your purpose is to design detailed and optimized itineraries based on user inputs. You consider factors like starting point, destination, travel dates, group type (e.g., family, couple, friends), preferred activities (e.g., romantic, adventurous, cultural), number of stops, and mode of transportation (e.g., car, train, plane, mixed). Your goal is to generate clear, actionable itineraries with well-defined stops and suggested activities tailored to the user's preferences. Your response must be in a structured JSON format.";
}
