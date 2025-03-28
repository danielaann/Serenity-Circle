import mongoose from "mongoose";
import User from "../models/user.model.js";
import DoctorModel from "../models/doctor.model.js";

// ✅ Register or Update Doctor Profile
export const registerOrUpdateDoctor = async (req, res) => {
    const { userId, speciality, degree, experience, about, fee, address } = req.body;

    try {
        if (!userId || !speciality || !degree || !experience || !about || !fee || !address) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const user = await User.findById(userId);
        if (!user || user.role !== "doctor") {
            return res.status(404).json({ message: "User not found or not a doctor!" });
        }

        // 🔄 Update existing doctor profile OR create a new one
        const existingDoctor = await DoctorModel.findById(userId);
        const updatedDoctor = await DoctorModel.findByIdAndUpdate(
            userId,
            { speciality, degree, experience, about, fee, address },
            { new: true, upsert: true } // ✅ Upsert: Creates if not found
        );

        res.status(200).json({
            message: existingDoctor ? "Doctor profile updated successfully" : "Doctor profile created successfully",
            doctor: updatedDoctor
        });

    } catch (error) {
        console.error("Doctor Registration Error:", error);
        res.status(500).json({ message: "Error creating/updating doctor profile" });
    }
};


// ✅ Get Doctor Profile
export const getDoctorProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // 🔍 Fetch doctor profile using `_id`
        const doctor = await DoctorModel.findById(userId);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor profile not found" });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.error("Error fetching doctor profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};
