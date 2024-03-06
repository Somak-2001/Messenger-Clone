'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from 'next/link';
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";


interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}
const Header: React.FC<HeaderProps> = ({
    conversation
}) => {
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const statusText = useMemo(() => {
        // Group Chat
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }
        //Single Chat
        return 'Active';
    }, [conversation]);
    return (
        <>
            <ProfileDrawer 
            data={conversation}
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}/>
            <div className="bg-white w-full flex justify-between items-center border-b-[1px] py-3 px-4 sm:px-4 lg:px-6 shadow-sm">
                <div className="flex items-center gap-3">
                    {/* Back Button to go to conversations page */}
                    <Link href='/conversations'
                        className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
                        <HiChevronLeft size={32} /> {/* Back Button */}
                    </Link>
                    {/* User Image */}
                    {conversation.isGroup?(
                        <AvatarGroup users={conversation.users} />
                    ):(
                        <Avatar user={otherUser} />
                    )}

                    <div className="flex flex-col">
                        {/* Conversation Name if it's a group chat otherwise otherUser name */}
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-sky-500 hover:text-sky-600 transition cursor-pointer" />
            </div>
        </>
    )
}

export default Header;
