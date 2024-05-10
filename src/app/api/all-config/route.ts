import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("user_id");

  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const apiURL = `http://164.92.105.13:5001/backend-api/config?user_id=${id}`;
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
