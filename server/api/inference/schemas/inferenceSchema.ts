import type { ResponseFormatJSONSchema } from "openai/resources/shared.mjs";

export const inferenceSchema: ResponseFormatJSONSchema = {
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
              id: {
                type: "string",
                description: "A unique identifier for the stop.",
              },
              title: {
                type: "string",
                description: "The title or name of the stop.",
              },
              lat: { type: "number", description: "The latitude of the stop." },
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
                description:
                  "Detailed description including historical significance, cultural importance, and key attractions.",
              },
            },
            required: ["title", "lat", "lng", "address", "details", "id"],
            additionalProperties: false,
          },
        },
      },
      required: ["title", "stops"],
      additionalProperties: false,
    },
  },
};
