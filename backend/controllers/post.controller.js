 import User from "../models/users.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
 const activeCheck=async(req,res)=>{
    return res.status(200).json({message:"Post route is active"});
}

export default activeCheck;