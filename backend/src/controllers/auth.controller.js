import { generateTokens } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        console.log("Signup request body:", req.body);

        if ( !email || !fullName || !password || password.length < 6) {
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
            password: hashedPassword
        });

        if (newUser) {
            try {
                generateTokens(newUser._id, res);
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

        generateTokens(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
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
    } catch (error) {
        console.log("Error in checkAuth controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}