import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig();

export const supabase = createClient(
  config.server.SUPABASE_URL,
  config.server.SUPABASE_KEY
);

async function getTodos() {
  const { data } = await supabase.from("todos").select();
}
