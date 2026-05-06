import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        return NextResponse.json({ savedColleges: user?.savedColleges || [] });
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { collegeId } = await request.json();
        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const isSaved = user.savedColleges.includes(collegeId);
        if (isSaved) {
            user.savedColleges = user.savedColleges.filter((id: string) => id !== collegeId);
        } else {
            user.savedColleges.push(collegeId);
        }
        await user.save();

        return NextResponse.json({
            saved: !isSaved,
            savedColleges: user.savedColleges,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}