import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig();

export const tripTable = config.server.TRIP_TABLE_NAME as "dev_trips" | "trips";

export const supabase = createClient(
  config.server.SUPABASE_URL,
  config.server.SUPABASE_KEY
);
