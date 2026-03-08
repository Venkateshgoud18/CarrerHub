import { Router } from "express";
import {activeCheck} from "../controllers/post.controller.js";
import { createPost } from "../controllers/post.controller.js";
import { getAllPosts } from "../controllers/post.controller.js";
import { deletePost } from "../controllers/post.controller.js";
import { commentPost } from "../controllers/post.controller.js";
import { deleteComment } from "../controllers/post.controller.js";
import { toggleLike } from "../controllers/post.controller.js";
import { getUserPostComments } from "../controllers/post.controller.js";
import multer from "multer";
const router=Router();
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const upload=multer({storage:storage});
router.route("/").get(activeCheck);
router.route("/create").post(upload.single("media"),createPost);
router.route("/get_allPosts").get(getAllPosts);
router.route("/delete/:id").delete(deletePost);
router.route("/comment/:id").post(commentPost);
router.route("/get_UserComments/:id").get(getUserPostComments);
router.route("/delete_comment/:postId/:commentId").delete(deleteComment);
router.route("/like/:id").post(toggleLike);
export default router;