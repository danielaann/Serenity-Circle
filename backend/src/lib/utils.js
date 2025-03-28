import jwt from "jsonwebtoken";

export const generateTokens = (userId, role, res) => {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set token in a cookie
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
    });
};