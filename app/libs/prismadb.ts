import { PrismaClient } from "@prisma/client";

//Type defined for global
declare global {
    var prisma : PrismaClient | undefined;
}

// This will prevent PrismaClient from getting regenerated again and again
const client = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;