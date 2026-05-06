import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        await connectDB();

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        return NextResponse.json({ message: "User created", userId: user._id });
    } catch (error) {
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}