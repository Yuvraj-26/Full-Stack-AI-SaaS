// required imports
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import replicate
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

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

        // check if user is on free trial or pro 
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        // if passed free trial and not pro trigger 403 pro subscription model
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        // Replicate AI modal usage - riffusion model run
        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt
                }
            }
        );

        if (!isPro) {
            await increaseApiLimit();
        }


        return NextResponse.json(response);
    } catch (error) {
        console.log("MUSIC_ERROR", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}