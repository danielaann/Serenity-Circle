import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctor.model.js";

export const doctorSignup = async (req, res) => {
    try {
        const { name, email, password, image, speciality, degree, experience, about, available, fee, address, date } = req.body;

        // Check if doctor already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new doctor
        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            image,
            speciality,
            degree,
            experience,
            about,
            available,
            fee,
            address,
            date
        });

        await newDoctor.save();

        // Generate JWT token
        const token = jwt.sign({ doctorId: newDoctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "strict" });

        res.status(201).json({
            message: "Doctor registered successfully",
            doctor: { name: newDoctor.name, email: newDoctor.email, speciality: newDoctor.speciality },
            token
        });

    } catch (error) {
        console.error("Doctor Signup Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if doctor exists
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "strict" });

        res.status(200).json({
            message: "Doctor logged in successfully",
            doctor: { name: doctor.name, email: doctor.email, speciality: doctor.speciality },
            token
        });

    } catch (error) {
        console.error("Doctor Login Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkDoctorAuth = (req,res) =>{
    try {
        res.status(200).json(req.doctor);
    } catch (error) {
        console.error("Error in checkDoctorAuth controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const doctorSignout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); // Clear JWT token
        res.status(200).json({ message: "Doctor logged out successfully" });
    } catch (error) {
        console.error("Error in doctorSignout controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
