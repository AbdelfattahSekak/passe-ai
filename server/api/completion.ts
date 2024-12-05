import OpenAI from "openai";
import type { ResponseFormatJSONSchema } from "openai/resources/shared.mjs";
import type { TripRequest } from "~/types";
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
              coordinates: {
                type: "string",
                description: "The geographical coordinates of the stop.",
              },
              address: {
                type: "string",
                description: "The physical address of the stop.",
              },
              details: {
                type: "string",
                description: "Additional details about the stop.",
              },
              images: {
                type: "array",
                description: "Array of images associated with the activity.",
                items: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                      description: "URL of the image.",
                    },
                    description: {
                      type: "string",
                      description: "Description of the image.",
                    },
                  },
                  required: ["url", "description"],
                  additionalProperties: false,
                },
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
                    coordinates: {
                      type: "string",
                      description:
                        "The geographical coordinates of the activity.",
                    },
                    details: {
                      type: "string",
                      description: "Additional details about the activity.",
                    },
                    address: {
                      type: "string",
                      description: "The physical address of the activity.",
                    },
                    images: {
                      type: "array",
                      description:
                        "Array of images associated with the activity.",
                      items: {
                        type: "object",
                        properties: {
                          url: {
                            type: "string",
                            description: "URL of the image.",
                          },
                          description: {
                            type: "string",
                            description: "Description of the image.",
                          },
                        },
                        required: ["url", "description"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: [
                    "title",
                    "coordinates",
                    "details",
                    "address",
                    "images",
                  ],
                  additionalProperties: false,
                },
              },
            },
            required: [
              "title",
              "coordinates",
              "address",
              "details",
              "activities",
              "images",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["stops"],
      additionalProperties: false,
    },
  },
} satisfies ResponseFormatJSONSchema;

const generatePrompt = ({
  startPoint,
  destination,
  startDate,
  endDate,
  preferences,
  groupType,
  activitiesType,
  nbStops,
  transportationMode,
}: TripRequest) => `
Plan a trip for me. Here are the details:

Start Point: [${startPoint}]
Destination: [${destination}]
Start Date: [${startDate}]
End Date: [${endDate}]
Group Type: [${groupType}]
Activities Type: [${activitiesType}]
Number of Stops: [${nbStops}]
Transportation Mode: [${transportationMode}]
Prefrences: [${preferences}]
Provide a detailed itinerary with stops and activities, formatted as a JSON object
`;

const getTripInference = async (body: TripRequest) => {
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
    max_tokens: 966,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as TripRequest;
  try {
    return await getTripInference(body);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
