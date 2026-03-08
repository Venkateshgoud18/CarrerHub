"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaRegCommentDots, FaShare } from "react-icons/fa";
import PostLike from "./postLike";
import PostComment from "./commentBox";


export default function Dashboard() {

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [postText, setPostText] = useState("");
const [media, setMedia] = useState<File | null>(null);
const [posts, setPosts] = useState<any[]>([]);
const [showComment, setShowComment] = useState(false);
const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
const [comments, setComments] = useState<{ [key: string]: any[] }>({});

const fetchComments = async (postId: string) => {
  try {
    const res = await fetch(`http://localhost:5000/get_UserComments/${postId}`);
    const data = await res.json();

    setComments((prev) => ({
      ...prev,
      [postId]: data.comments
    }));

  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/get_allPosts");
        const data = await res.json();
  
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
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
  const handleCreatePost = async () => {
    try {
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("User not authenticated");
        return;
      }
  
      const formData = new FormData();
      formData.append("body", postText);
  
      if (media) {
        formData.append("media", media);
      }
  
      const res = await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setPostText("");
        setMedia(null);
        alert("Post created");
      } else {
        alert(data.message);
      }
  
    } catch (error) {
      console.error(error);
    }
  };

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
            <Link href="/profile">
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              View Profile
            </button>
            </Link>
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
          {/* Create Post */}
<div className="bg-white p-4 rounded-lg shadow-sm">

<textarea
  placeholder="Share something with your network..."
  value={postText}
  onChange={(e) => setPostText(e.target.value)}
  className="w-full border border-gray-300 bg-white text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
  type="file"
  onChange={(e) => setMedia(e.target.files?.[0] || null)}
  className="mt-2"
/>

<button
  onClick={handleCreatePost}
  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
>
  Post
</button>

</div>

          {/* Example Post */}
          {posts.map((post) => (
  <div key={post._id} className="bg-white p-4 rounded-lg shadow-sm">

    <h4 className="font-semibold">
      {post.userId?.name}
    </h4>

    <p className="text-gray-600 text-sm">
      {post.userId?.email}
    </p>

    <p className="mt-3">
      {post.body}
    </p>

    {post.media && (
  <img
    src={`http://localhost:5000/${post.media}`}
    className="mt-3 rounded-md w-full"
  />
)}

<div className="flex gap-6 mt-4 text-gray-600 text-sm items-center">

      <PostLike post={post} />

      <button
  onClick={() => {
    setActiveCommentPostId(
      activeCommentPostId === post._id ? null : post._id
    );

    fetchComments(post._id);
  }}
  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
>
  <FaRegCommentDots size={16} />
  Comment
</button>

      <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-blue-600 transition">
        <FaShare size={16} />
        Share
      </button>

    </div>

    {/* Comment Box */}
    {activeCommentPostId === post._id && (
  <div className="mt-4 space-y-3">

{post.comments?.map((c: any) => (
  <div key={c._id} className="bg-gray-100 rounded-md p-2 text-sm">
    <p className="font-semibold">{c.userId?.name}</p>
    <p>{c.comment}</p>
  </div>
))}

    <PostComment post={post} />

  </div>
)}

  </div>
))}

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