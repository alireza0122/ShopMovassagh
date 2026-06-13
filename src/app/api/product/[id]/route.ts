import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "public", "data", "db.json");

// GET - گرفتن یک محصول
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    const product = data.Product.find(
        (item: any) => String(item.id) === String(id)
    );

    if (!product) {
        return NextResponse.json({ error: "پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(product);
}

// PATCH - ویرایش محصول
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json();

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    data.Product = data.Product.map((item: any) =>
        String(item.id) === String(id) ? { ...item, ...body } : item
    );

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: "updated" });
}


export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    data.Product = data.Product.filter(
        (item: any) => String(item.id) !== String(id)
    );

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: "deleted" });
}