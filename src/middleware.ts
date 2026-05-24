import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

    const userId = request.cookies.get("userId")?.value;

    // اگر لاگین نبود
    if (!userId) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {

        // گرفتن کاربر از json-server
        const response = await fetch(`http://localhost:3001/user/${userId}`);

        // اگر کاربر نبود
        if (!response.ok) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        const user = await response.json();

        // چک کردن رول واقعی
        if (user.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();

    } catch (error) {

        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: "/adminPanel/:path*",
};