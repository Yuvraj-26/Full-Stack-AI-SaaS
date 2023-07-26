import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

// call to public app url localhost:3000/settings
const settinsgUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unathorized", { status: 401 });
        }

        // find current user subscription
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        });

        // if user subscripton exists and if stripe customer id exists
        // redirect to billing portal to cancel active subscription where retur nurl is /settings
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settinsgUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        // if no existing user subscription
        // redirect to checkout portal
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settinsgUrl,
            cancel_url: settinsgUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Genius Pro",
                            description: "Unlimited AI Generations",
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId,
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}