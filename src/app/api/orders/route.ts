import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const newOrder = await req.json();

        const filePath = path.join(
            process.cwd(),
            "public",
            "data",
            "db.json"
        );

        const fileData = await fs.readFile(filePath, "utf-8");
        const db = JSON.parse(fileData);

        db.orders.push(newOrder);

        await fs.writeFile(
            filePath,
            JSON.stringify(db, null, 2),
            "utf-8"
        );

        return NextResponse.json(newOrder, { status: 201 });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "خطا در ثبت سفارش" },
            { status: 500 }
        );
    }
}
