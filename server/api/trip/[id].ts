import { defineEventHandler } from 'h3';
import { supabase } from '~/server/supabase';
import { logger } from '@/server/utils/logger';

export default defineEventHandler(async (event) => {
  try {
    const tripId = getRouterParam(event, 'id');
    
    if (!tripId) {
      return new Response('Trip ID is required', { status: 400 });
    }

    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', tripId)
      .single();

    if (error) {
      logger.error('Database fetch error:', error);
      return new Response('Failed to fetch trip from database', { status: 500 });
    }

    if (!data) {
      return new Response('Trip not found', { status: 404 });
    }

    return data;
  } catch (error) {
    logger.error('Trip fetch API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});
