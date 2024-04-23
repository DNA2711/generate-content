import { title } from "process";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const request = await req.json();
  const {
    outline_id,
    user_id,
    content_type,
    tone_of_voice,
    content_length,
    content_about,
    keywords_of_content,
    language,
    outline,
    title,
  } = request;
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const infoContent = {
    outline_id,
    user_id,
    content_type,
    tone_of_voice,
    content_length,
    content_about,
    keywords_of_content,
    language,
    outline,
    title,
  };

  const apiURL = `http://164.92.105.13:5001/backend-api/config`;
  const res = await fetch(apiURL, {
    method: "POST",
    headers: header,
    next: {
      revalidate: 0,
    },
    body: JSON.stringify(infoContent),
  });

  const result = await res.json();
  return NextResponse.json(result);
}
