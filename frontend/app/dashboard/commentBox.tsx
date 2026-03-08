import { useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
}

export default function PostComment({ post }: { post: Post }) {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/comment/${post._id}`,
        { body: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment("");
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div className="mt-3 flex gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 border rounded-md px-3 py-1 text-sm"
      />

      <button
        onClick={handleComment}
        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
      >
        Post
      </button>
    </div>
  );
}