import type { SearchFormData } from "~/types";

export function validateRequestBody(body: SearchFormData) {
  if (!body.start || !body.destination) {
    return new Error("Start and destination locations are required");
  }

  if (body.start.length > 50 || body.destination.length > 50) {
    return new Error("Start or destination are not correct");
  }

  if (!body.nbStops || body.nbStops < 1 || body.nbStops > 10) {
    return new Error("Number of stops must be between 1 and 10");
  }

  return null;
}
