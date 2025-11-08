import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

serve(async (req) => {
  const { username } = await req.json();
  const url = `https://www.kaggle.com/${username}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    if (!doc) {
      throw new Error("Failed to parse HTML");
    }

    const fullName = doc.querySelector("h1")?.textContent?.trim();
    const profileImageUrl = doc.querySelector("img.profile-image")?.getAttribute("src");
    const bio = doc.querySelector(".profile-bio")?.textContent?.trim();
    const country = doc.querySelector(".profile-country")?.textContent?.trim();
    const city = doc.querySelector(".profile-city")?.textContent?.trim();
    const organization = doc.querySelector(".profile-organization")?.textContent?.trim();
    const website = doc.querySelector(".profile-website")?.getAttribute("href");
    const githubUsername = doc.querySelector(".profile-github")?.textContent?.trim();
    const twitterUsername = doc.querySelector(".profile-twitter")?.textContent?.trim();
    const linkedinUrl = doc.querySelector(".profile-linkedin")?.getAttribute("href");
    const tier = doc.querySelector(".profile-tier")?.textContent?.trim();
    const points = doc.querySelector(".profile-points")?.textContent?.trim();
    const followers = doc.querySelector(".profile-followers")?.textContent?.trim();
    const following = doc.querySelector(".profile-following")?.textContent?.trim();

    const data = {
      fullName,
      profileImageUrl,
      bio,
      country,
      city,
      organization,
      website,
      githubUsername,
      twitterUsername,
      linkedinUrl,
      tier,
      points,
      followers,
      following,
    };

    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
