"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

type RegisterForm = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  
      <div className="bg-white p-8 rounded-lg shadow-md w-[420px]">
  
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create CareerHub Account
        </h2>
  
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
  
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
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
            {loading ? "Creating Account..." : "Register"}
          </button>
  
        </form>
  
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
  
      </div>
  
    </div>
  );
}