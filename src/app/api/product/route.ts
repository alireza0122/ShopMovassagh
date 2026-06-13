import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "public", "data", "db.json");

// GET - گرفتن همه محصولات
export async function GET() {
    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);
    return NextResponse.json(data.Product);
}

// POST - اضافه کردن محصول جدید
export async function POST(req: Request) {
    const body = await req.json();

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    // ساخت ID یونیک
    const newId = Date.now().toString();

    const newProduct = {
        id: newId,
        title: body.title || "",
        price: Number(body.price) || 0,
        qty: Number(body.qty) || 0,
        description: body.description || "",
        urlImg: body.urlImg || "",
    };

    data.Product.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, product: newProduct });
}