import { H3Event } from 'h3';
import { generateTripInference } from '../services/inferenceService';
import { enrichLocationData } from '../services/locationService';
import { validateRequestBody } from '../validators/requestValidator';
import { logger } from '../../../utils/logger';
import type { SearchFormData, Trip } from '~/types';
import { v4 as uuidv4 } from 'uuid';

export async function processInference(event: H3Event) {
  try {
    const body = await readBody(event) as SearchFormData;
    
    // Validate request body
    const validationError = validateRequestBody(body);
    if (validationError) {
      return new Response(validationError.message, { status: 400 });
    }

    // Generate trip inference
    const inferenceResult = await generateTripInference(body);
    if (!inferenceResult) {
      return new Response("Failed to generate trip inference", { status: 400 });
    }

    // Enrich with location data
    const enrichedTrip = await enrichLocationData(inferenceResult);

    // Construct final response
    const response: Trip = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      start: body.start,
      destination: body.destination,
      ...enrichedTrip
    };

    logger.info('Successfully processed inference request', { tripId: response.id });
    return response;
  } catch (error) {
    logger.error('Error processing inference:', error);
    throw error;
  }
}