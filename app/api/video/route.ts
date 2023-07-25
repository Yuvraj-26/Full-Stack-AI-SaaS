// required imports
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import replicate
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

// API handler to generate music
export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        // check for authentication
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // check if messages have not been passed to the route
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // Replicate AI modal usage - zeroscope model run
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt
              }
            }
          );


        return NextResponse.json(response);
    } catch (error) {
        console.log("VIDEO_ERROR", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}