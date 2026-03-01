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
            message: "User registered successfully"
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
            // token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
            }
        });

    } catch (err) {
        console.error("Error in login controller:", err);
        return res.status(500).json({ message: "Server error" });
    }   
}
