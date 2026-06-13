import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "public", "data", "db.json");

export async function GET() {
    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    const products = data.Product?.length || 0;
    const orders = data.orders?.length || 0;
    const users = data.user?.length || 0;
    const sales = data.orders?.reduce((sum: number, o: any) => sum + (Number(o.totalPrice) || 0), 0) || 0;

    return NextResponse.json({ products, orders, users, sales });
}