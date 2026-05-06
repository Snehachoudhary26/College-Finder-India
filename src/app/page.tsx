"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

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
  image: string;
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        location,
        course,
        page: page.toString(),
      });
      const res = await fetch(`/api/colleges?${params}`);
      const data = await res.json();
      setColleges(data.colleges || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchColleges();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">🎓 CollegeFinder India</h1>
            <p className="text-blue-100 mt-1">Discover the best colleges across India</p>
            <Link href="/compare" className="mt-3 inline-block bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
              ⚖️ Compare Colleges
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/saved" className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
                  🔖 Saved
                </Link>
                <span className="text-blue-100 text-sm">Hi, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
                  Login
                </Link>
                <Link href="/register" className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-300 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search college name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Filter by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-48 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-48 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              <option value="B.Tech">B.Tech</option>
              <option value="MBA">MBA</option>
              <option value="MBBS">MBBS</option>
              <option value="M.Tech">M.Tech</option>
              <option value="BCA">BCA</option>
            </select>
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-gray-500 mb-4 text-sm">{total} colleges found</p>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-xl">Loading...</div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-xl">No colleges found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div key={college._id} className="bg-white rounded-xl shadow hover:shadow-md transition p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      college.type === "Government" ? "bg-green-100 text-green-700" :
                      college.type === "Private" ? "bg-blue-100 text-blue-700" :
                      "bg-purple-100 text-purple-700"
                    }`}>
                      {college.type}
                    </span>
                    <span className="text-yellow-500 font-bold">⭐ {college.rating}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-1">{college.name}</h2>
                  <p className="text-gray-500 text-sm mb-2">📍 {college.location}, {college.state}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {college.courses.slice(0, 3).map((c) => (
                      <span key={c} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-3 mt-2 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Annual Fees</p>
                    <p className="text-blue-700 font-bold">₹{(college.fees / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Placement</p>
                    <p className="text-green-600 font-bold">{college.placementPercentage}%</p>
                  </div>
                  <Link
                    href={`/colleges/${college._id}`}
                    className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100"
            >
              ← Prev
            </button>
            <span className="px-4 py-2 text-gray-600">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}