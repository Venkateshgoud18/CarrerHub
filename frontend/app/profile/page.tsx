"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {

  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    bio: "",
    currentPost: "",
    pastWork: "",
    education: ""
  });
  const handleImageChange = (e: any) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUploadProfilePic = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!profileImage) {
        alert("Please select an image");
        return;
      }
  
      const formData = new FormData();
      formData.append("profilePicture", profileImage);
  
      const res = await fetch("http://localhost:5000/update_profile_picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message);
  
      alert("Profile picture updated!");
  
      setProfileData({
        ...profileData,
        user: {
          ...profileData.user,
          profilePicture: data.profilePicture,
        },
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

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

        const data = await res.json();

        setProfileData(data);

        setFormData({
          bio: data?.profile?.bio || "",
          currentPost: data?.profile?.currentPost || "",

          pastWork:
            data?.profile?.pastWork
              ?.map((work: any) => work.company)
              .join(", ") || "",

          education:
            data?.profile?.education
              ?.map((edu: any) => edu.school)
              .join(", ") || ""
        });

      } catch (err: any) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchProfile();

  }, []);

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleUpdate = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/update_profile_data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({

          bio: formData.bio,
          currentPost: formData.currentPost,

          pastWork: formData.pastWork
            ? formData.pastWork.split(",").map((company) => ({
                company: company.trim(),
                position: "",
                years: ""
              }))
            : [],

          education: formData.education
            ? formData.education.split(",").map((school) => ({
                school: school.trim(),
                degree: "",
                fieldOfStudy: ""
              }))
            : []

        })

      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setProfileData({
        ...profileData,
        profile: data.profile
      });

      setEditing(false);

    } catch (err: any) {

      alert(err.message);

    }

  };

  const handleDownloadResume = () => {

    const userId = profileData?.profile?.userId;
  
    if (!userId) {
      alert("User ID not found");
      return;
    }
  
    window.open(
      `http://localhost:5000/user/download_resume/${userId}`,
      "_blank"
    );
  
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-black">
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

    <div className="min-h-screen bg-gray-100 text-black">

      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between">

        <Link href="/dashboard" className="text-blue-600 font-bold text-xl">
          CareerHub
        </Link>

        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

      </nav>

      <div className="max-w-4xl mx-auto mt-10 px-4">

        <div className="bg-white shadow rounded-lg p-6">

          {/* Profile Header */}
          <div className="flex items-center gap-6">

            <img
              src={
                user?.profilePicture
                  ? `http://localhost:5000/uploads/${user.profilePicture}`
                  : "https://via.placeholder.com/100"
              }
              className="w-24 h-24 rounded-full object-cover border"
            />

            <div>

              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-600">
                @{user?.username}
              </p>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">

            <button
              onClick={() => setEditing(!editing)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>

            <button
              onClick={handleDownloadResume}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Download Resume
            </button>
            <label className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer">
    Change Profile Picture
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
  </label>

  {profileImage && (
    <button
      onClick={handleUploadProfilePic}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Upload
    </button>
  )}

          </div>

          {/* Bio */}
          <div className="mt-6">

            <h3 className="font-semibold text-lg mb-2">
              Bio
            </h3>

            {editing ? (

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white text-black"
              />

            ) : (

              <p className="text-gray-700">
                {profile?.bio || "No bio added"}
              </p>

            )}

          </div>

          {/* Current Role */}
          <div className="mt-4">

            <h3 className="font-semibold">
              Current Role
            </h3>

            {editing ? (

              <input
                name="currentPost"
                value={formData.currentPost}
                onChange={handleChange}
                className="border p-2 rounded w-full bg-white text-black"
              />

            ) : (

              <p className="text-gray-700">
                {profile?.currentPost || "Not specified"}
              </p>

            )}

          </div>

          {/* Past Work */}
          <div className="mt-4">

            <h3 className="font-semibold">
              Past Work
            </h3>

            {editing ? (

              <input
                name="pastWork"
                value={formData.pastWork}
                onChange={handleChange}
                className="border p-2 rounded w-full bg-white text-black"
              />

            ) : (

              <p className="text-gray-700">
                {profile?.pastWork?.length > 0
                  ? profile.pastWork.map((w: any) => w.company).join(", ")
                  : "Not specified"}
              </p>

            )}

          </div>

          {/* Education */}
          <div className="mt-4">

            <h3 className="font-semibold">
              Education
            </h3>

            {editing ? (

              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="border p-2 rounded w-full bg-white text-black"
              />

            ) : (

              <p className="text-gray-700">
                {profile?.education?.length > 0
                  ? profile.education.map((e: any) => e.school).join(", ")
                  : "Not specified"}
              </p>

            )}

          </div>

          {/* Save Button */}
          {editing && (

            <button
              onClick={handleUpdate}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
            >
              Save Changes
            </button>

          )}

        </div>

      </div>

    </div>

  );

}