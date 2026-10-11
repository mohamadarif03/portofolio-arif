import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache on edge/server for 1 hour

export async function GET() {
  const username = "mohamadarif03";

  try {
    // 1. Fetch live contributions from public contributions API
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "Portfolio-Arif-App",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const contributions = (data.contributions || []).map(
        (day: { date: string; count: number }) => ({
          date: day.date,
          count: day.count,
        })
      );

      if (contributions.length > 0) {
        return NextResponse.json({
          username,
          total: data.total?.lastYear || 0,
          contributions,
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch live GitHub contributions:", error);
  }

  // 2. Fallback to cached file if API has rate limits or network issues
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", "github-contributions.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const fallbackDays = JSON.parse(fileData);

    return NextResponse.json({
      username,
      total: fallbackDays.reduce((acc: number, cur: { count: number }) => acc + (cur.count || 0), 0),
      contributions: fallbackDays,
    });
  } catch (fallbackError) {
    console.error("Failed to read fallback contributions:", fallbackError);
    return NextResponse.json(
      { error: "Could not retrieve GitHub activity" },
      { status: 500 }
    );
  }
}
