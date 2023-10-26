import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';

interface IParams {
    conversationId ?: string
}

export async function POST (
    // All take request as first argument
    request: Request,
    { params } : { params : IParams }
){
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;
        
        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized User', { status: 401 });
        }

        // Find the existing conversation
        const conversation = await prisma?.conversation.findUnique({
            where:{ id: conversationId },
            include: {
                messages: {
                    include: {
                        seen: true,
                    }
                },
                users: true,
            }
        });

        if(!conversation){
            return new NextResponse('Invalid Id', { status: 400});
        }

        // Find the last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if(!lastMessage){
            return NextResponse.json(conversation);
        }

        // Update seen of Last Message
        const updatedMessage = await prisma?.message.update({
            where: { id: lastMessage.id },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        return NextResponse.json(updatedMessage);
    } catch (error : any) {
        console.log(error, 'Error Message');
        return new NextResponse('Internal Error', { status: 500});
    }
}