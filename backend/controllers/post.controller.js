 import User from "../models/users.model.js";
import Profile from "../models/profile.model.js";
import Post from "../models/posts.model.js";
import bcrypt from "bcrypt";
 export const activeCheck=async(req,res)=>{
    return res.status(200).json({message:"Post route is active"});
}
export const createPost=async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const user=await User.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const post=new Post({
            userId:user._id,
            body:req.body.body,
            media:req.file?req.file.path:"",
            fileType:req.file?req.file.mimetype:"",
        });
        await post.save();
        return res.status(201).json({message:"Post created successfully",post:post});
    }catch(error){
        console.error("Error creating post:",error);
        return res.status(500).json({message:"Internal server error"});
    }
} ;
export const getAllPosts = async (req, res) => {
    try {
  
      const posts = await Post.find()
        .populate("userId", "name email")
        .populate("comments.userId", "name email")   
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        posts
      });
  
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  };
export const deletePost=async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const user=await User.findOne({token:token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        if(post.userId.toString()!==user._id.toString()){
            return res.status(403).json({message:"Forbidden"});
        }
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Post deleted successfully"});
    }catch(error){
        console.error("Error deleting post:",error);
        return res.status(500).json({message:"Internal server error"});
    }
} ;

export const commentPost = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({
            userId: user._id,
            comment: req.body.body  
        });

        await post.save();

        return res.status(200).json({
            message: "Comment added successfully",
            post
        });

    } catch (error) {
        console.error("Error commenting on post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const getUserPostComments = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const posts = await Post.find({ userId })
        .populate("comments.userId", "name email");
  
      // collect all comments
      const comments = posts.flatMap(post =>
        post.comments.map(c => ({
          postId: post._id,
          user: c.userId,
          comment: c.comment,
          createdAt: c.createdAt
        }))
      );
  
      res.status(200).json({ comments });
  
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
export const deleteComment = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Cleaner ObjectId comparison
        if (!comment.userId.equals(user._id)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // ✅ Safe removal
        post.comments = post.comments.filter(
            c => c._id.toString() !== req.params.commentId
        );

        await post.save();

        return res.status(200).json({
            message: "Comment deleted successfully",
            post
        });

    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const toggleLike = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const user = await User.findOne({ token });

        const post = await Post.findById(req.params.id);

        const alreadyLiked = post.likedBy.includes(user._id);

        if (alreadyLiked) {
            post.likes -= 1;
            post.likedBy.pull(user._id);
        } else {
            post.likes += 1;
            post.likedBy.push(user._id);
        }

        await post.save();

        return res.status(200).json({
            post,
            liked: !alreadyLiked
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message:"Internal server error" });
    }
};