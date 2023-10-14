import prisma from '@/app/libs/prismadb';

import getSession from './getSession';

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        // Checking if session present or not
        if (!session?.user?.email) {
            return null;
        }

        // Checking for currentUser
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null;
        }

        return currentUser;
    }
    catch (error: any) {
        return null;
    }
}