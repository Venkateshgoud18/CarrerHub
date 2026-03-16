import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

interface Post {
  _id: string;
  likes: number;
}

export default function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5000/like/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikes(res.data.post.likes);
      setLiked(res.data.liked); 
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 hover:text-blue-600"
    >
      {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      Like ({likes})
    </button>
  );
}