import { User } from "@prisma/client";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";


const useOtherUser = (conversation: FullConversationType | {
    users: User[]
}) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currenUserEmail = session?.data?.user?.email;

        const otherUser = conversation.users.filter((user) => 
        user.email !== currenUserEmail);

        return otherUser[0];

    }, [session?.data?.user?.email, conversation.users]);

    return otherUser;
}

export default useOtherUser;
