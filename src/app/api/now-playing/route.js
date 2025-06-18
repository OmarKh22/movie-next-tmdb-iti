import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;

  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        page,
      },
    }
  );

  return NextResponse.json(res.data);
}
