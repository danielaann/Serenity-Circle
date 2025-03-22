import jwt from "jsonwebtoken";
import doctorModel from "../models/doctor.model.js";

const protectDoctorRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const doctor = await doctorModel.findById(decoded.doctorId).select("-password");
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        req.doctor = doctor;
        next();

    } catch (error) {
        console.log("Error in protectDoctorRoute middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default protectDoctorRoute;
