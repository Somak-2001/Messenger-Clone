import { withAuth } from "next-auth/middleware";

// Default SignIn page (Protected route whenever there is no current user then redirect to default log in page)
export default withAuth({
    pages: {
        signIn: '/'
    }
});

// 
export const config = {
    matcher : [
        "/users/:path*"  // /users/:path* = dynamic routing in /users
    ]
};