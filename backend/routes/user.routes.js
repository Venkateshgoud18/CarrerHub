import {Router} from "express";
import {register,login} from "../controllers/user.controller.js";
import { uploadProfilePicture } from "../controllers/user.controller.js";
import { updateUserProfile } from "../controllers/user.controller.js";
import { getUserProfile } from "../controllers/user.controller.js";
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
router.route("/update_profile_picture").post(upload.single("profile_Picture"),uploadProfilePicture);
   
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user").get(getUserProfile);
export default router;