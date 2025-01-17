import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST (
    request : Request
){

    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const {
            message,
            image,
            conversationId
        } = body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized', { status: 401});
        }

        // For NextMessage
        const newMessage = await prisma.message.create({
            data:{
                body: message,
                image: image,
                conversation: {
                    connect:{
                        id: conversationId
                    }
                },
                sender: {
                    connect:{
                        id: currentUser.id
                    }
                },
                // We are pushing currentUser to the seen array, coz the person who sends the message have seen the meesage atfirst
                seen: {
                    connect:{
                        id: currentUser.id
                    }
                }
            },
            include:{
                sender: true,
                seen: true
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where:{
                id: conversationId
            },
            data:{
                lastMessageAt: new Date(),
                messages: {
                    connect:{
                        id: newMessage.id
                    }
                }
            },
            include:{
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        });

        return NextResponse.json(newMessage);
        
    } catch (error:any) {
        console.log(error,'ERROR Message');
        return new NextResponse('Internal Error', {status: 500});
    }
}