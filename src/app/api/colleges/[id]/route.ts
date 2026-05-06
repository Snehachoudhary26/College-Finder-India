import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import College from "@/models/College";

export async function GET(
    request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const params = await context.params;
        const college = await College.findById(params.id);
        if (!college) {
            return NextResponse.json({ error: "College not found" }, { status: 404 });
        }
        return NextResponse.json({ college });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch college" }, { status: 500 });
    }
}