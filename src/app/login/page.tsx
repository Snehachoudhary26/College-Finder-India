"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password");
            setLoading(false);
        } else {
            router.push("/");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back 👋</h1>
                <p className="text-gray-400 text-sm mb-6">Login to your CollegeFinder account</p>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 font-medium"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-700 font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
}