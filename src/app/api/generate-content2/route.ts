import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const request = await req.json();

  const { id, trending } = request;
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const apiURL = `http://164.92.105.13:5001/backend-api/content?outline_id=${id}`;
  const res = await fetch(apiURL, {
    method: "GET",
    headers: header,
    next: {
      revalidate: 0,
    },
  });

  const result = await res.json();
  console.log(result);
  return NextResponse.json(result);
}
