// import { auth } from "@/auth";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextRequest } from "next/server";
import {
    DEFAULT_LOGIN_REDIRECT,
    LOGIN_ROUTE,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";

// export default auth((req) => {
//     // req.auth
// });

// export const { auth: middleware } = NextAuth(authConfig);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    console.log("[middleware]", req.nextUrl.pathname);

    const isLoggedIn = !!req.auth?.user;

    const isApiAuthRoute = req.nextUrl?.pathname?.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(req.nextUrl?.pathname);
    const isAuthRoute = authRoutes.includes(req.nextUrl?.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl).toString(),
            );
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(LOGIN_ROUTE, req.nextUrl).toString());
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
