// required imports
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        // check for authentication
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // check for openAI API key configuration
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        // check if prompt has not been passed to the route
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }
        // check if amount has not been passed to the route
        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }
        // check if resolution has not been passed to the route
        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }
        // check if user is on free trial or pro 
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        // if passed free trial and not pro trigger 403 pro subscription model
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        // open AI modal usage
        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        if (!isPro) {
            await increaseApiLimit();
        }

        return NextResponse.json(response.data.data);
    } catch (error) {
        console.log("IMAGE_ERROR", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}