import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type")?.trim();
  const tone = searchParams.get("tone")?.trim();
  const length = searchParams.get("length")?.trim();
  const language = searchParams.get("language")?.trim();
  const about = searchParams.get("about")?.trim();
  const keywords = searchParams.get("keywords")?.trim();
  const links = searchParams.get("links")?.trim();

  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const apiURL = `http://164.92.105.13:5001/backend-api/outline?content_type=${type}&tone_of_voice=${tone}&content_length=${length}&content_about=${about}&keywords_of_content=${keywords}&language=${language}&links=${links}&user_id=user_1`;

  const res = await fetch(apiURL, {
    method: "GET",
    headers: header,
    next: {
      revalidate: 0,
    },
  });

  const result = await res.json();
  return NextResponse.json(result);
}
