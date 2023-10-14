'use client';

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const route = useRoutes();
    const { isOpen } = useConversation();

    // If a chat is open then we don't want the mobile footer, we want the input text field
    if (isOpen) {
        return null;
    }

    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
                {route.map((item) => (
                    <MobileItem
                        key={item.label}
                        label={item.label}
                        href={item.href}
                        icon={item.icon}
                        onClick={item.onClick}
                        active={item.active}
                    />
                ))}
        </div>
    )
}

export default MobileFooter;
