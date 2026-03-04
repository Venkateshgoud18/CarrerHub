"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {

  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/get_user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        console.log("Profile API:", data);

        setProfileData(data);

      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  const user = profileData?.user;
  const profile = profileData?.profile;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

        <Link href="/dashboard" className="text-blue-600 font-bold text-xl">
          CareerHub
        </Link>

        <Link
          href="/dashboard"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Dashboard
        </Link>

      </nav>

      {/* Profile Container */}
      <div className="max-w-4xl mx-auto mt-10 px-4">

        <div className="bg-white shadow-md rounded-lg p-6">

          {/* Profile Header */}
          <div className="flex items-center gap-6">

            <img
              src={
                user?.profilePicture
                  ? `http://localhost:5000/uploads/${user.profilePicture}`
                  : "https://via.placeholder.com/100"
              }
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border"
            />

            <div>

              <h2 className="text-2xl font-bold text-black">
                {user?.name || "Unknown User"}
              </h2>

              <p className="text-gray-600">
                @{user?.username || "username"}
              </p>

              <p className="text-gray-500 text-sm">
                {user?.email}
              </p>

            </div>

          </div>

          {/* Bio */}
          <div className="mt-6">

            <h3 className="font-semibold text-lg mb-2">
              About
            </h3>

            <p className="text-gray-700">
              {profile?.bio || "No bio added yet."}
            </p>

          </div>

          {/* Profile Details */}
          <div className="mt-6 grid grid-cols-2 gap-4">

            <div>

              <h4 className="font-semibold">
                Current Role
              </h4>

              <p className="text-gray-600">
                {profile?.currentPost || "Not specified"}
              </p>

            </div>

            <div>

              <h4 className="font-semibold">
                Past Work
              </h4>

              <p className="text-gray-600">
                {profile?.pastWork?.length > 0
                  ? profile.pastWork.join(", ")
                  : "Not specified"}
              </p>

            </div>

          </div>

          {/* Education Section */}
          <div className="mt-6">

            <h4 className="font-semibold">
              Education
            </h4>

            <p className="text-gray-600">
              {profile?.education?.length > 0
                ? profile.education.join(", ")
                : "Not specified"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}