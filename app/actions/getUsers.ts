import prisma from '@/app/libs/prismadb';

import getSession from './getSession';

const getUsers = async () => {
    const session = await getSession();

    // If there is no user in session then return empty array
    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            // Used to sort users by Date (To take the new users at the top)
            orderBy: {
                createdAt: 'desc'
            },
            // This query will return a list of end-users except the currentUser
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        return users;

    } catch (error: any) {
        return [];
    }
};

export default getUsers;