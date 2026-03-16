"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  username: string;
  profile_Picture: string;
}

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const res = await fetch("http://localhost:5000/user/get_connections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (data && data.connections) {
        setConnections(data.connections);
      }

    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CareerHub</h1>

        <div className="flex gap-6 font-medium text-gray-800">
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          <Link href="/getConnections" className="hover:text-blue-600">
            Connection Requests
          </Link>

          <Link href="/profile" className="hover:text-blue-600">
            Profile
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto mt-10 px-4">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          My Connections ({connections.length})
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading connections...</p>
        ) : connections.length === 0 ? (
          <p className="text-gray-600">No connections yet</p>
        ) : (
          <div className="space-y-4">
            {connections.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-white shadow-lg border border-gray-200 p-4 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profile_Picture || "/default-avatar.png"}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover border"
                  />

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {user.name}
                    </h2>

                    <p className="text-gray-600">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <button className="px-4 py-1 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Message
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}