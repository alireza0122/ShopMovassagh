import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const userId = request.cookies.get("userId")?.value;
    const role = request.cookies.get("role")?.value;

    if (!userId) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/adminPanel/:path*",
};