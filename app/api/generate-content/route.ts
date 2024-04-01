import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const tone = searchParams.get("tone");
  const length = searchParams.get("length");
  const about = searchParams.get("about");
  const keywords = searchParams.get("keywords");

  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const apiURL = `http://164.92.105.13:5001/backend-api/gc?type=${type}&tone=${tone}&length=${length}&about=${about}&keywords=${keywords}`;
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
