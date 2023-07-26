import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// util to increase API count on each istance API called
export const increaseApiLimit = async () => {
    const { userId } = auth();

    // if no userId
    if (!userId) {
        return;
    }

    // npx prisma generate 
    // re-run the prisma generate command after every change that's made to 
    // Prisma schema to update the generated Prisma Client code.

    // check for entry in prisma studio table for specific user
    const userApiLimit = await prismadb.userApiLimit. findUnique({
        where: {
            userId
        }
    });

    // if userApiLimit exists, increment
    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {userId: userId},
            data: { count: userApiLimit.count + 1 },
        });
    // else create a new userApiLimit
    } else {
        await prismadb.userApiLimit.create({
            data: { userId: userId, count: 1 }
        });
    }
};

// util to check if user has reached limit of free usage
export const checkApiLimit = async () => {
    const { userId } = auth();

    // if no userId, user cannot continue
    if (!userId) {
        return false;
    }

    // if userId, fetch userApiLimit
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    // If no userApiLimit or userApiLimit count is less than max
    // for instance, user never run a generation or has remaining counts
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    // if user has passed the max counts
    } else {
        return false;
    }
};


// util to get Api Limit Count
export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) {
        return 0
    }

    // fetch the user Api Limit model
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    // if no userApiLimit or user has never run a generation
    if (!userApiLimit) {
        return 0
    }

    return userApiLimit.count;
}