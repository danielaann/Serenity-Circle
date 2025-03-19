import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import noteRoutes from "./routes/notes.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import moodRoutes from "./routes/mood.routes.js";
import dotenv from "dotenv";
import{connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notes",noteRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/moods",moodRoutes)

app.listen(PORT, ()=>{
    console.log("Server is running on port:"+ PORT);
    connectDB();
});