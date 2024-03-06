'use client';


import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();
    
    useEffect(()=>{
        setIsMounted(true);
    },[])


    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router]);

    // Getting the last message
    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    }, [data.messages]);

    // User Email
    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    // Checking if the message is seen by the user
    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        // seenArray is a list of users who has seen the lastmessage
        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray
            .filter((user) => user.email === userEmail).length !== 0
    }, [lastMessage, userEmail]);

    // Text to display to currentuser
    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent a image';
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return 'Start a new conversation';
    }, [lastMessage]);

    if(!isMounted) return null;

    return (
        <div onClick={handleClick}
            className={clsx('w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer',
                selected ? 'bg-neutral-100' : 'bg-white')}>
                    {
                        data.isGroup? (
                            <AvatarGroup users={data.users} />
                        ) : (   
                            <Avatar user={otherUser} />
                        )
                    }

            <div className="flex justify-between items-center mb-1">
                <p className="text-md font-medium text-gray-900">
                    {data.name || otherUser.name}
                    <p className={clsx('truncate text-xs',
                        hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
                        {lastMessageText}
                    </p>
                </p>
                {
                    lastMessage?.createdAt && (
                        <p className="text-xs text-gray-400 font-light">
                            {format(new Date(lastMessage.createdAt), 'p')}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default ConversationBox;
