"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/get_all_users", {
          credentials: "include",
        });

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    const name = user.userId?.name?.toLowerCase() || "";
    const username = user.userId?.username?.toLowerCase() || "";
    return (
      name.includes(search.toLowerCase()) ||
      username.includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-600">
          CareerHub
        </h1>

        <div className="flex items-center gap-4">

          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 bg-white text-gray-800 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Link
            href="/profile"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Profile
          </Link>

          <Link
            href="/"
            className="text-red-500 font-medium hover:text-red-600"
          >
            Logout
          </Link>

        </div>

      </nav>

      {/* Dashboard Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-6 px-6">

        {/* Left Sidebar */}
        <div className="col-span-3 space-y-4">

          <div className="bg-white p-4 rounded-lg shadow-sm">
          <Link href="/profile">
  <h2 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
    Your Profile
  </h2>
</Link>

            <p className="text-gray-600 text-sm mt-2">
              Welcome back 👋
            </p>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              View Profile
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">
                My Connections
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Saved Posts
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Messages
              </li>
            </ul>
          </div>

        </div>

        {/* Feed */}
        <div className="col-span-6 space-y-4">

          {/* Create Post */}
          <div className="bg-white p-4 rounded-lg shadow-sm">

            <textarea
              placeholder="Share something with your network..."
              className="w-full border border-gray-300 bg-white text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Post
            </button>

          </div>

          {/* Example Post */}
          <div className="bg-white p-4 rounded-lg shadow-sm">

            <h4 className="font-semibold">
              John Doe
            </h4>

            <p className="text-gray-600 text-sm">
              Software Engineer
            </p>

            <p className="mt-3">
              Excited to start my new journey in full stack development 🚀
            </p>

            <div className="flex gap-6 mt-4 text-gray-600 text-sm">
              <button className="hover:text-blue-600">Like</button>
              <button className="hover:text-blue-600">Comment</button>
              <button className="hover:text-blue-600">Share</button>
            </div>

          </div>

        </div>

        {/* Right Sidebar */}
        <div className="col-span-3">

          <div className="bg-white p-4 rounded-lg shadow-sm">

            <h3 className="font-semibold mb-4">
              Suggested Connections
            </h3>

            <div className="space-y-3">

              {filteredUsers.map((user) => (

                <div
                  key={user._id}
                  className="flex justify-between items-center"
                >

                  <span className="text-black font-medium">
                    {user.userId?.name || user.userId?.username}
                  </span>

                  <button className="text-blue-600 text-sm hover:underline">
                    Connect
                  </button>

                </div>

              ))}

              {filteredUsers.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No users found
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}