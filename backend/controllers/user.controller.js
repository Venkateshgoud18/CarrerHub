import User from "../models/users.model.js";
import Profile from "../models/profile.model.js";   // 🔥 Capital P
import bcrypt from "bcrypt";
import crypto from "crypto";

export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username,
        });

        await newUser.save();

        // ✅ Create profile properly
        const newProfile = new Profile({
            userId: newUser._id,
        });

        await newProfile.save();

        return res.status(201).json({
            message: "User registered successfully",
            "token":crypto.randomBytes(64).toString("hex"),
             user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            }   
        });

    } catch (err) {
        console.error("Error in register controller:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    // Implement login logic here
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token=crypto.randomBytes(64).toString("hex");
        await User.updateOne({_id:user._id},{$set:{token}});
        // Generate token logic here (e.g., JWT)
        // const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            token
          });

    } catch (err) {
        console.error("Error in login controller:", err);
        return res.status(500).json({ message: "Server error" });
    }   
}

export const uploadProfilePicture = async (req, res) => {
    try {
        const { token } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        user.profilePicture = req.file.filename;
        await user.save();
        console.log(req.file);

        return res.status(200).json({
            message: "Profile picture uploaded successfully"
        });

    } catch (err) {
        console.error("Error in uploadProfilePicture controller:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateUserProfile=async(req,res)=>{
    try{
        const {token,...newUserData}=req.body;
        const user=await User.findOne({token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const {username,email}=newUserData;
        const existingUser=await User.findOne({
            $or:[
                {email},
                {username}
            ],
            _id:{$ne:user._id}
        });
        if(existingUser){
            return res.status(400).json({message:"Email or username already in use"});
        }
        Object.assign(user,newUserData);
        await user.save();
        return res.status(200).json({
            message:"Profile updated successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                username:user.username,
                profilePicture:user.profilePicture,
            }
        });
    }
    catch(err){
        console.error("Error in updateUserProfile controller:", err);
        return res.status(500).json({ message: "Server error" });   

    }
}
export const getUserProfile=async(req,res)=>{
    try{
        const {token}=req.body;
        const user=await User.findOne({token});
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        return res.status(200).json({
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                username:user.username,
                profilePicture:user.profilePicture,
            }
        });
    }
    catch(err){
        console.error("Error in getUserProfile controller:", err);
        return res.status(500).json({ message: "Server error" });
    }
}