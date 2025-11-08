import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_shared/supabase.ts";

const KAGGLE_USERNAMES = [
  "gpreda",
  "jhoward",
  "dansbecker",
  "abhishek",
  "pavanraj159",
];

serve(async (_req) => {
  try {
    for (const username of KAGGLE_USERNAMES) {
      const { data, error } = await supabase.functions.invoke("scrape-kaggle", {
        body: { username },
      });

      if (error) {
        console.error(`Error scraping ${username}:`, error);
        continue;
      }

      const { data: upsertData, error: upsertError } = await supabase
        .from("profiles")
        .upsert({ kaggle_username: username, ...data });

      if (upsertError) {
        console.error(`Error upserting ${username}:`, upsertError);
      }
    }

    return new Response(
      JSON.stringify({ message: "Scraping complete." }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
