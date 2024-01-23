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
    const { nextUrl } = req;
    console.log("[middleware]", nextUrl.pathname);

    const isLoggedIn = !!req.auth?.user;

    const isApiAuthRoute = nextUrl?.pathname?.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl?.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl?.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, nextUrl).toString(),
            );
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
        );
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
