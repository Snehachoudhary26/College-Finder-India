"use client";
import { useEffect, useState } from "react";
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
    established: number;
}

export default function ComparePage() {
    const [allColleges, setAllColleges] = useState<College[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [compared, setCompared] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/colleges?limit=100&page=1")
            .then((res) => res.json())
            .then((data) => {
                setAllColleges(data.colleges || []);
                setLoading(false);
            });
    }, []);

    const handleSelect = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((s) => s !== id));
        } else if (selected.length < 3) {
            setSelected([...selected, id]);
        }
    };

    const handleCompare = () => {
        const colleges = allColleges.filter((c) => selected.includes(c._id));
        setCompared(colleges);
    };

    const handleReset = () => {
        setSelected([]);
        setCompared([]);
    };

    const fields = [
        { label: "Location", key: (c: College) => `${c.location}, ${c.state}` },
        { label: "Type", key: (c: College) => c.type },
        { label: "Annual Fees", key: (c: College) => `₹${(c.fees / 100000).toFixed(1)}L` },
        { label: "Rating", key: (c: College) => `⭐ ${c.rating}` },
        { label: "Placement %", key: (c: College) => `${c.placementPercentage}%` },
        { label: "Avg Package", key: (c: College) => `₹${(c.avgPackage / 100000).toFixed(1)}L` },
        { label: "Established", key: (c: College) => `${c.established}` },
        { label: "Courses", key: (c: College) => c.courses.slice(0, 3).join(", ") },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-blue-700 text-white py-6 px-4">
                <div className="max-w-6xl mx-auto">
                    <Link href="/" className="text-blue-200 hover:text-white text-sm mb-3 inline-block">
                        ← Back to Colleges
                    </Link>
                    <h1 className="text-3xl font-bold">⚖️ Compare Colleges</h1>
                    <p className="text-blue-100 mt-1">Select 2 or 3 colleges to compare side by side</p>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Selection Area */}
                {compared.length === 0 && (
                    <>
                        <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center justify-between">
                            <p className="text-gray-600">
                                Selected: <span className="font-bold text-blue-700">{selected.length}/3</span> colleges
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={handleCompare}
                                    disabled={selected.length < 2}
                                    className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-40"
                                >
                                    Compare Now →
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-20 text-gray-400">Loading colleges...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allColleges.map((college) => {
                                    const isSelected = selected.includes(college._id);
                                    return (
                                        <div
                                            key={college._id}
                                            onClick={() => handleSelect(college._id)}
                                            className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer border-2 transition ${isSelected
                                                    ? "border-blue-700 bg-blue-50"
                                                    : "border-transparent hover:border-gray-200"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-gray-800">{college.name}</p>
                                                    <p className="text-gray-500 text-sm">📍 {college.location}</p>
                                                    <p className="text-blue-700 font-medium text-sm mt-1">
                                                        ₹{(college.fees / 100000).toFixed(1)}L • ⭐ {college.rating}
                                                    </p>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-blue-700 bg-blue-700" : "border-gray-300"
                                                    }`}>
                                                    {isSelected && <span className="text-white text-xs">✓</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {/* Comparison Table */}
                {compared.length >= 2 && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Comparison Results</h2>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                                ← Compare Again
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-700 text-white">
                                        <th className="p-4 text-left w-32">Feature</th>
                                        {compared.map((c) => (
                                            <th key={c._id} className="p-4 text-center">
                                                <p className="font-bold">{c.name}</p>
                                                <span className="text-xs text-blue-200">{c.type}</span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map((field, i) => (
                                        <tr key={field.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="p-4 font-medium text-gray-600 text-sm">{field.label}</td>
                                            {compared.map((c) => (
                                                <td key={c._id} className="p-4 text-center text-gray-800">
                                                    {field.key(c)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}