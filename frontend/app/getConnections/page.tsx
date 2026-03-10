"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  username: string;
  profile_Picture: string;
}



export default function GetConnections() {
  const [requests, setRequests] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token missing");
        return;
      }

      const res = await fetch(
        "http://localhost:5000/user/get_connections_requests",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setRequests(data.connectionRequests || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAccept = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "http://localhost:5000/user/respond_to_connection_request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            accept: true,
          }),
        }
      );
  
      const data = await res.json();
  
      console.log(data);
  
      // remove accepted request from UI
      setRequests((prev) =>
        prev.filter((user) => user._id !== userId)
      );
  
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };
  const handleReject = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "http://localhost:5000/user/respond_connection_request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            accept: false,
          }),
        }
      );
  
      const data = await res.json();
      console.log(data);
  
      setRequests((prev) =>
        prev.filter((user) => user._id !== userId)
      );
  
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          CareerHub
        </h1>

        <div className="flex gap-6 font-medium text-gray-800">
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          <Link href="/connections" className="hover:text-blue-600">
            My Connections
          </Link>

          <Link href="/profile" className="hover:text-blue-600">
            Profile
          </Link>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="max-w-3xl mx-auto mt-10 px-4">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Connection Requests ({requests.length})
        </h1>

        {loading ? (
          <div className="text-gray-600">Loading requests...</div>
        ) : requests.length === 0 ? (
          <p className="text-gray-600">No connection requests</p>
        ) : (
          <div className="space-y-4">
            {requests.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-white border border-gray-200 shadow-lg p-4 rounded-xl"
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

                <div className="flex gap-3">
                <button
  onClick={() => handleAccept(user._id)}
  className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
>
  Accept
</button>

<button
  onClick={() => handleReject(user._id)}
  className="border border-gray-300 px-4 py-1 rounded-lg text-gray-800 hover:bg-gray-100"
>
  Reject
</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}