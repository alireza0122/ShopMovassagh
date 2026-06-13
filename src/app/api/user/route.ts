import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(
            process.cwd(),
            "public",
            "data",
            "db.json"
        );

        const fileData = await fs.readFile(filePath, "utf-8");
        const db = JSON.parse(fileData);

        return NextResponse.json({
            user: db.user
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "خطا در دریافت کاربران" },
            { status: 500 }
        );
    }
}