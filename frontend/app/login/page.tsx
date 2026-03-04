"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      localStorage.setItem("token", data.token);

      router.push("/dashboard");

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  
      <div className="bg-white p-8 rounded-lg shadow-md w-[420px]">
  
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to CareerHub
        </h2>
  
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
  
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
  
        </form>
  
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
  
      </div>
  
    </div>
  );
}