import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// const day
const DAY_IN_MS = 86_400_000;

// check subscription if expired
export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  // attempt to find user subscription
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  // if no active subscription, user is not subscribed
  if (!userSubscription) {
    return false;
  }

  // check if subscription is valid, not expired
  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  // !! valid is always boolean
  return !!isValid;
};