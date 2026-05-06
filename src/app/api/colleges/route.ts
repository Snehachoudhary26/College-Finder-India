import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import College from "@/models/College";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const location = searchParams.get("location") || "";
        const course = searchParams.get("course") || "";
        const minFees = searchParams.get("minFees");
        const maxFees = searchParams.get("maxFees");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 6;

        const query: any = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        if (location) {
            query.$or = [
                { location: { $regex: location, $options: "i" } },
                { state: { $regex: location, $options: "i" } },
            ];
        }
        if (course) {
            query.courses = { $regex: course, $options: "i" };
        }
        if (minFees || maxFees) {
            query.fees = {};
            if (minFees) query.fees.$gte = parseInt(minFees);
            if (maxFees) query.fees.$lte = parseInt(maxFees);
        }

        const total = await College.countDocuments(query);
        const colleges = await College.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ rating: -1 });

        return NextResponse.json({
            colleges,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch colleges" },
            { status: 500 }
        );
    }
}