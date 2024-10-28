import { NextRequest, NextResponse } from "next/server";
import { suggestionData } from "./data";

export const runtime = "edge";

function getRandomSuggestions(source: string[], amount: number) {
  const array = [...source];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];

    array[i] = array[j];
    array[j] = temp;
  }

  return array.slice(0, amount);
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const amount = parseInt(searchParams.get("amount") ?? "1", 10) || 1;

  return NextResponse.json(getRandomSuggestions(suggestionData, amount));
}
