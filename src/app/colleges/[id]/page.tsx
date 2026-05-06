"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface College {
    _id: string;
    name: string;
    location: string;
    state: string;
    fees: number;
    rating: number;
    courses: string[];
    placementPercentage: number;
    avgPackage: number;
    type: string;
    description: string;
    established: number;
    cutoffRanks: { JEE?: number; NEET?: number; CAT?: number };
}

export default function CollegeDetailPage() {
    const params = useParams();
    const id = params?.id;
    const [college, setCollege] = useState<College | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        if (!id) return;
        fetch(`/api/colleges/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCollege(data.college || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
            Loading...
        </div>
    );

    if (!college) return (
        <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
            College not found
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50">
            <header className="bg-blue-700 text-white py-6 px-4">
                <div className="max-w-5xl mx-auto">
                    <Link href="/" className="text-blue-200 hover:text-white text-sm mb-3 inline-block">
                        ← Back to Colleges
                    </Link>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block ${college.type === "Government" ? "bg-green-500" :
                                    college.type === "Private" ? "bg-blue-500" : "bg-purple-500"
                                } text-white`}>
                                {college.type}
                            </span>
                            <h1 className="text-3xl font-bold">{college.name}</h1>
                            <p className="text-blue-100 mt-1">📍 {college.location}, {college.state}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold text-yellow-400">⭐ {college.rating}</div>
                            <p className="text-blue-100 text-sm">Established {college.established}</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-blue-700">₹{(college.fees / 100000).toFixed(1)}L</p>
                        <p className="text-gray-400 text-sm">Annual Fees</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">{college.placementPercentage}%</p>
                        <p className="text-gray-400 text-sm">Placement Rate</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-600">₹{(college.avgPackage / 100000).toFixed(1)}L</p>
                        <p className="text-gray-400 text-sm">Avg Package</p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-6">
                <div className="flex gap-2 border-b mb-6">
                    {["overview", "courses", "placements"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 capitalize font-medium border-b-2 transition ${activeTab === tab
                                    ? "border-blue-700 text-blue-700"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "overview" && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-3 text-gray-800">About</h2>
                            <p className="text-gray-600 leading-relaxed">{college.description}</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-3 text-gray-800">Cutoff Ranks</h2>
                            {college.cutoffRanks && Object.entries(college.cutoffRanks).filter(([, v]) => v).map(([exam, rank]) => (
                                <div key={exam} className="flex justify-between py-2 border-b last:border-0">
                                    <span className="font-medium text-gray-700">{exam}</span>
                                    <span className="text-blue-700 font-bold">{rank}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "courses" && (
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Courses Offered</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {college.courses.map((course) => (
                                <div key={course} className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
                                    <span className="text-blue-700 font-medium">{course}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "placements" && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4 text-gray-800">Placement Stats</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Placement Rate</span>
                                    <span className="text-green-600 font-bold text-xl">{college.placementPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${college.placementPercentage}%` }} />
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-gray-600">Average Package</span>
                                    <span className="text-purple-600 font-bold text-xl">₹{(college.avgPackage / 100000).toFixed(1)}L</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4 text-gray-800">Top Recruiters</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro"].map((company) => (
                                    <div key={company} className="bg-gray-50 rounded-lg p-2 text-center text-sm text-gray-700 font-medium">
                                        {company}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}