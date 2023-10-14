import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";
import { useMemo } from 'react';

import { HiChat } from 'react-icons/hi';
import {
    HiArrowLeftOnRectangle,
    HiUsers
} from 'react-icons/hi2';

import useConversation from './useConversation';


const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId }  = useConversation();

    const routes = useMemo(()=>[
        {
            label: 'Chat',
            href: '/conversation',
            icon: HiChat,
            active: pathname === '/conversation' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Logout', 
            onClick: () => signOut(),
            href: '#',
            icon: HiArrowLeftOnRectangle, 
          }
    ],[pathname, conversationId]);

    return routes;
}

export default useRoutes;