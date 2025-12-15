import { NextResponse } from "next/server";
import { generatePackage } from "@/lib/generator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = typeof body?.topic === "string" ? body.topic : "";

    const generated = generatePackage(topic);

    return NextResponse.json({
      topic: generated.topic,
      research: {
        headline: generated.selectedFact.hook,
        angle: generated.selectedFact.angle,
        context: generated.selectedFact.context,
        source: generated.selectedFact.source,
        summary: generated.researchSummary,
      },
      script: generated.script,
      soraPrompt: generated.soraPrompt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to process the topic right now.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
