import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await params;

        const filePath = path.join(
            process.cwd(),
            "public",
            "data",
            "db.json"
        );

        const file = await fs.readFile(filePath, "utf-8");
        const db = JSON.parse(file);

        db.user = db.user.filter(
            (user: any) => user.id.toString() !== id
        );

        await fs.writeFile(
            filePath,
            JSON.stringify(db, null, 2),
            "utf-8"
        );

        return NextResponse.json({
            success: true,
            message: "کاربر حذف شد"
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}
