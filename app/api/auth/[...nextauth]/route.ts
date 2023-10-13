import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"

import prisma from '@/app/libs/prismadb';

import bcrypt from 'bcrypt';
import NextAuth from "next-auth/next";

export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials : {
                email: { label : 'email', type: 'text'},
                password: { label : 'password', type: 'password'}
            },
            async authorize(credentials){
                // If the email and password fields are empty then it will throw an error
               if(!credentials?.email || !credentials?.password){
                throw new Error('Invalid Credentials');
               }
                   
               // Fetching user by email
               const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
               });

               //Checking if user exists or not and the hashedPassword is used to check if the user is registered through Google or Github then he is not allowed to log in through credentials
               if(!user || !user.hashedPassword){
                throw new Error("Incorrect username or password");
               }

               // Checking if user put correct password or not
               const isCorrectPassword = await bcrypt.compare(
                credentials.password ,
                user.hashedPassword
               );

               if(!isCorrectPassword){
                throw new Error('Invalid credentials');
               }

               return user;
            }
        })
    ],

    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};