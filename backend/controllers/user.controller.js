import User from "../models/users.model.js";
import Profile from "../models/profile.model.js";   
import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";
const convertUserDataToPDF = async (userProfile) => {
    const doc=new PDFDocument();
    const outputPath=crypto.randomBytes(16).toString("hex")+".pdf";
    const writeStream=fs.createWriteStream("uploads/"+outputPath);
    doc.pipe(writeStream);
    doc.fontSize(20).text(userProfile.userId.name,{align:"center"});
    doc.moveDown();
    doc.fontSize(14).text(`Username: ${userProfile.userId.username}`);
    doc.text(`Bio: ${userProfile.bio}`);
    doc.text(`Current Post: ${userProfile.currentPost}`);
    if(userProfile.pastWork.length>0){
        doc.moveDown();
        doc.fontSize(16).text("Past Work:");
        userProfile.pastWork.forEach((work,index)=>{
            doc.fontSize(14).text(`${index+1}. Company: ${work.company}, Position: ${work.position}, Years: ${work.years}`);
        });
    }
    if(userProfile.education.length>0){
        doc.moveDown();
        doc.fontSize(16).text("Education:");
        userProfile.education.forEach((edu,index)=>{
            doc.fontSize(14).text(`${index+1}. School: ${edu.school}, Degree: ${edu.degree}, Field of Study: ${edu.fieldOfStudy}`);
        });
    }
    doc.end();
    return new Promise((resolve,reject)=>{
        writeStream.on("finish",()=>{
            resolve(outputPath);
        });
        writeStream.on("error",(err)=>{
            reject(err);
        });
    }); 
}
export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }


        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or username already exists"
            });
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 👤 Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username,
            profilePicture: "default.jpg",
            token: ""   // initialize empty token
        });

        await newUser.save();

        // 📄 Create profile document
        const newProfile = new Profile({
            userId: newUser._id
        });

        await newProfile.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            }
        });

    } catch (err) {
        console.error("Error in register controller:", err);
        return res.status(500).json({ 
            message: "Server error" 
        });
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
        user.token = token;
        await user.save();
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
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        user.profilePicture = req.file.filename;
        await user.save();

        return res.status(200).json({
            message: "Profile picture uploaded successfully",
            profilePicture: req.file.filename
        });

    } catch (err) {
        console.error("Error in uploadProfilePicture:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { username, email, name } = req.body;

        // 🔎 Check if username/email already exists for another user
        if (username || email) {
            const existingUser = await User.findOne({
                $or: [
                    username ? { username } : null,
                    email ? { email } : null
                ].filter(Boolean),
                _id: { $ne: user._id }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email or username already in use"
                });
            }
        }

        // 🔐 Update only allowed fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (username) user.username = username;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                profilePicture: user.profilePicture
            }
        });

    } catch (err) {
        console.error("Error in updateUserProfile:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getUserProfile = async (req, res) => {
    try {
  
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
  
      const user = await User.findOne({ token });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const userProfile = await Profile.findOne({ userId: user._id });
  
      return res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          profilePicture: user.profilePicture,
          connections: user.connections,
          connectionRequests: user.connectionRequests
        },
        profile: userProfile
      });
  
    } catch (err) {
  
      console.error("Error in getUserProfile:", err);
  
      return res.status(500).json({ message: "Server error" });
  
    }
  };

export const updateProfileData = async (req, res) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const userProfile = await Profile.findOne({ userId: user._id });

        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const { bio, currentPost, pastWork, education } = req.body;

        if (bio !== undefined) {
            userProfile.bio = bio;
        }

        if (currentPost !== undefined) {
            userProfile.currentPost = currentPost;
        }

        if (pastWork !== undefined) {

            userProfile.pastWork = pastWork.map((work) => ({
                company: work.company || "",
                position: work.position || "",
                years: work.years || ""
            }));

        }

        if (education !== undefined) {

            userProfile.education = education.map((edu) => ({
                school: edu.school || "",
                degree: edu.degree || "",
                fieldOfStudy: edu.fieldOfStudy || ""
            }));

        }

        await userProfile.save();

        res.status(200).json({
            message: "Profile updated successfully",
            profile: userProfile
        });

    } catch (err) {

        console.error("Error in updateProfileData:", err);

        res.status(500).json({
            message: err.message
        });

    }
};

export const getAllUserProfile=async(req,res)=>{
    try {
        const profiles = await Profile.find().populate("userId", "name username profile_Picture");
        res.status(200).json(profiles);
    } catch (err) {
        console.error("Error in getAllUserProfile:", err);
        res.status(500).json({ message: "Server error" });
    }
};
export const downloadProfile = async (req, res) => {
    try {

        const userId = req.params.id;

        const userProfile = await Profile.findOne({ userId })
            .populate("userId", "name username profilePicture");

        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const pdfPath = await convertUserDataToPDF(userProfile);

        const fullPath = `uploads/${pdfPath}`;

        res.download(fullPath, "resume.pdf", (err) => {
            if (err) {
                console.error("Download error:", err);
            }
        });

    } catch (error) {
        console.error("Error in downloadProfile:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const sendRequestConnection = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const user= await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const connectionUser= await User.findById(req.body.userId);
        if (!connectionUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if (connectionUser._id.equals(user._id)) {
            return res.status(400).json({ message: "Cannot connect with yourself" });
        }
        if (connectionUser.connections.includes(user._id)) {
            return res.status(400).json({ message: "Already connected" });
        }
        if (connectionUser.connectionRequests.includes(user._id)) {
            return res.status(400).json({ message: "Connection request already sent" });
        }
        connectionUser.connectionRequests.push(user._id);
        await connectionUser.save();
        return res.status(200).json({ message: "Connection request sent successfully" });
        
    } catch (error) {
        console.error("Error in sendRequestConnection:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getConnectionsRequests = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const user= await User.findOne({ token }).populate("connectionRequests", "name username profile_Picture");
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(200).json({ connectionRequests: user.connectionRequests });
        
    } catch (error) {
        console.error("Error in getConnectionsRequests:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getConnections = async (req, res) => {
    try {
  
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
  
      const user = await User.findOne({ token })
        .populate("connections", "name username profile_Picture");
  
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      return res.status(200).json({
        connections: user.connections,
      });
  
    } catch (error) {
      console.error("Error in getConnections:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

export const respondToConnectionRequest = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { userId, accept } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const connectionUser = await User.findById(userId);
        if (!connectionUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // ❌ Cannot respond to yourself
        if (user._id.equals(connectionUser._id)) {
            return res.status(400).json({ message: "Invalid operation" });
        }

        // ✅ Check if request actually exists
        const requestExists = user.connectionRequests.some(id =>
            id.equals(connectionUser._id)
        );

        if (!requestExists) {
            return res.status(400).json({
                message: "No connection request from this user"
            });
        }

        if (accept) {
            // ✅ Add to connections (avoid duplicates)
            if (!user.connections.some(id => id.equals(connectionUser._id))) {
                user.connections.push(connectionUser._id);
            }

            if (!connectionUser.connections.some(id => id.equals(user._id))) {
                connectionUser.connections.push(user._id);
            }
        }

        // ✅ Remove from pending requests
        user.connectionRequests = user.connectionRequests.filter(
            id => !id.equals(connectionUser._id)
        );

        await user.save();
        await connectionUser.save();

        return res.status(200).json({
            message: accept
                ? "Connection request accepted"
                : "Connection request rejected"
        });

    } catch (error) {
        console.error("Error in respondToConnectionRequest:", error);
        return res.status(500).json({ message: "Server error" });
    }
};