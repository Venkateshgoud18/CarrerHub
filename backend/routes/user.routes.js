import {Router} from "express";
import {register,login} from "../controllers/user.controller.js";
import { uploadProfilePicture } from "../controllers/user.controller.js";
import { updateUserProfile } from "../controllers/user.controller.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { updateProfileData } from "../controllers/user.controller.js";
import { getAllUserProfile } from "../controllers/user.controller.js";
import { downloadProfile } from "../controllers/user.controller.js";
import { sendRequestConnection } from "../controllers/user.controller.js";
import { getConnectionsRequests } from "../controllers/user.controller.js";
import { respondToConnectionRequest } from "../controllers/user.controller.js";
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
router.route("/update_profile_data").post(updateProfileData);
router.route("/user/get_all_users").get(getAllUserProfile);
router.route("/user/download_resume/:id").get(downloadProfile);
router.route("/user/send_request_connection").post(sendRequestConnection);
router.route("/user/get_connections_requests").get(getConnectionsRequests);
router.route("/user/respond_to_connection_request").post(respondToConnectionRequest);
export default router;