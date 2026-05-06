import mongoose, { Schema, Document } from "mongoose";

export interface ICollege extends Document {
    name: string;
    location: string;
    state: string;
    fees: number;
    rating: number;
    courses: string[];
    placementPercentage: number;
    avgPackage: number;
    description: string;
    image: string;
    established: number;
    type: "Government" | "Private" | "Deemed";
    cutoffRanks: {
        JEE?: number;
        NEET?: number;
        CAT?: number;
    };
}

const CollegeSchema = new Schema<ICollege>(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        state: { type: String, required: true },
        fees: { type: Number, required: true },
        rating: { type: Number, required: true },
        courses: [{ type: String }],
        placementPercentage: { type: Number, default: 0 },
        avgPackage: { type: Number, default: 0 },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        established: { type: Number },
        type: { type: String, enum: ["Government", "Private", "Deemed"] },
        cutoffRanks: {
            JEE: { type: Number },
            NEET: { type: Number },
            CAT: { type: Number },
        },
    },
    { timestamps: true }
);

export default mongoose.models.College ||
    mongoose.model<ICollege>("College", CollegeSchema);