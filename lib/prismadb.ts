import { PrismaClient } from "@prisma/client";


// add prisma variable to global
declare global {
    var prisma: PrismaClient | undefined;
};

// in development assign primsa to global this
// prevents warning for multiple prisma clients instances active
// nextjs 13 hot releoding

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;