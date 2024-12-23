import OpenAI from "openai";
import type { ResponseFormatJSONSchema } from "openai/resources/shared.mjs";
import type { SearchFormData, Stop } from "@/types";
import getTripAdvisorLocationInfo from "../utils/getTripAdvisorLocationInfo";

const config = useRuntimeConfig();

const openai = new OpenAI({
  apiKey: config.server.OPENAI_API_KEY,
});

const responseFormat = {
  type: "json_schema",
  json_schema: {
    name: "travel_itinerary",
    strict: true,
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "A catchy title describing the overall trip.",
        },
        stops: {
          type: "array",
          description: "A list of stops in the travel itinerary.",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title or name of the stop.",
              },
              lat: {
                type: "number",
                description: "The latitude of the stop.",
              },
              lng: {
                type: "number",
                description: "The longitude of the stop.",
              },
              address: {
                type: "string",
                description: "The physical address of the stop.",
              },
              details: {
                type: "string",
                description: "Additional details about the stop.",
              },

              activities: {
                type: "array",
                description: "List of activities available at the stop.",
                items: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: "The title or name of the activity.",
                    },
                    lat: {
                      type: "number",
                      description: "The latitude of the activity.",
                    },
                    lng: {
                      type: "number",
                      description: "The longitude of the activity.",
                    },
                    details: {
                      type: "string",
                      description: "Additional details about the activity.",
                    },
                    address: {
                      type: "string",
                      description: "The physical address of the activity.",
                    },
                  },
                  required: ["title", "lat", "lng", "details", "address"],
                  additionalProperties: false,
                },
              },
            },
            required: [
              "title",
              "lat",
              "lng",
              "address",
              "details",
              "activities",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["title", "stops"],
      additionalProperties: false,
    },
  },
} satisfies ResponseFormatJSONSchema;
const generatePrompt = ({ start, destination, nbStops }: SearchFormData) => `
Plan a trip for me. Here are the details:
Start Point: [${start}]
Destination: [${destination}]
Start Date:[]
End Date: []
Group Type: []
Activities Type: []
Number of Stops: [${nbStops}]
Transportation Mode: []
Prefrences: []
Provide a detailed itinerary with stops ( including start and destination ) and activities, formatted as a JSON object.
`;
const getTripInference = async (body: SearchFormData) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are a highly specialized AI expert in trip and road trip planning. Your purpose is to design detailed and optimized itineraries based on user inputs. You consider factors like starting point, destination, travel dates, group type (e.g., family, couple, friends), preferred activities (e.g., romantic, adventurous, cultural), number of stops, and mode of transportation (e.g., car, train, plane, mixed). Your goal is to generate clear, actionable itineraries with well-defined stops and suggested activities tailored to the user's preferences. Your response must be in a structured JSON format.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: generatePrompt(body),
          },
        ],
      },
    ],
    response_format: responseFormat,
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as SearchFormData;
  try {
    const result = await getTripInference(body);
    if (result) {
      const tripData = JSON.parse(result) as { stops: Stop[] };

      // Process each stop and its activities
      for (const stop of tripData.stops) {
        // Get location info for the stop
        const stopLocationInfo = await getTripAdvisorLocationInfo(stop.address);
        stop.locationInfo = stopLocationInfo;

        // Process activities for each stop
        for (const activity of stop.activities) {
          const activityLocationInfo = await getTripAdvisorLocationInfo(
            activity.address
          );
          activity.locationInfo = activityLocationInfo;
        }
      }

      return tripData;
    }
    return new Response("Bad Request", { status: 400 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
