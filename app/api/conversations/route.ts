import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    try {
        const currenUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            // isGroup, members, name are for group chat
            isGroup,
            members,
            name,
        } = body;

        // Checking for currentUser
        if(!currenUser?.id || !currenUser?.email){
            return new NextResponse('Unauthorized', {status : 401});
        }

        // Checking for group
        if(isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse('Invalid Data', {status: 400});
        }

        // Creating Conversation
        if(isGroup){
            const newConversation = await prisma.conversation.create({
                data:{
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member : { value : string})=> ({ id: member.value })),
                            // Excuding the currentUser
                            {
                                id: currenUser?.id
                            }
                        ]
                    }
                },
                // Used to populate users
                include: {
                    users: true
                }
            })

            return NextResponse.json(newConversation);
        }

        const existingConversation = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currenUser?.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currenUser?.id]
                        }
                    }
                ]
            }
        })
        const singleConversation = existingConversation[0];

        // If conversation already exists then we will just add it in our database and send back a response with that conversation
        if(singleConversation){
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currenUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                },
            },
            include: {
                users: true
            }
        })

        return NextResponse.json(newConversation);

    } catch (error: any) {
        return new NextResponse('Internal Error', {status: 500});
    }
}