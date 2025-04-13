import { generateTokens } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        if ( !email || !fullName ) {
            return res.status(400).json({ message: "Please Name and Email" });
        }

        if ( !password || password.length < 6) {
            return res.status(400).json({ message: "Password should be greater than 6 characters" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        if (newUser) {
            try {
                generateTokens(newUser._id,newUser.role, res);
            } catch (err) {
                console.log("Error generating tokens:", err.message);
                return res.status(500).json({ message: "Token generation failed" });
            }
            await newUser.save();
            return res.status(201).json({ message: "User registered successfully" });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req,res)=>{
    const {email,password} = req.body
    try{
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"})
        }

        generateTokens(user._id,user.role,res)
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role,
        })


    }catch (error){
        console.error("Error in login controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const signout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({ message: "Logged out succesfully"});
    } catch (error){
        console.error("Error in signout controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user);
        console.log(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.error("Error in updateProfile controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}