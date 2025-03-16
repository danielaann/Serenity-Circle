import asyncHandler from "express-async-handler";
import TaskModel from "../models/task.model.js";

// Create a new task
export const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Please provide a title" });
        }

        if (!description || description.trim() === "") {
            return res.status(400).json({ message: "Please provide a description" });
        }

        const task = new TaskModel({
            title,
            description,
            dueDate,
            status,
            priority,
            user: req.user._id,
        });

        await task.save();
        return res.status(201).json({ message: "Task created", task });

    } catch (error) {
        console.error("Error in createTask controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all tasks
export const getTasks = asyncHandler(async (req,res) => {
    const userId = req.user._id;

    if(!userId){
        return res.status(400).json({message: "Unauthorized access"});
    }
    try {
        const tasks = await TaskModel.find({user: userId});
        res.status(200).json({
            length: tasks.length,
            tasks,
        });
    } catch (error) {
        console.error("Error in getTasks controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// View a task
export const viewTask = asyncHandler(async (req,res) => {
    const userId = req.user._id;
    const { taskId } = req.params;

    if(!userId){
        return res.status(400).json({message: "Unauthorized access"});
    };
    if (!taskId){
        return res.status(400).json({message: "Task not found"});
    };

    try {
        const task = await TaskModel.findById(taskId);
        if(!task){
            return res.status(400).json({message: "Task not found"});
        };

        res.status(200).json({message: "Task found", task});
    } catch (error) {
        console.error("Error in viewTask controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//Update a task
export const updateTask = asyncHandler(async (req,res) => {
    const userId = req.user._id;
    const { taskId } = req.params;
    if(!userId || !taskId){
        return res.status(400).json({message: "Unauthorized access or TaskId not found"});
    };
    try {
        const {title,description,dueDate,status,priority,completed} = req.body;

        const task = await TaskModel.findById(taskId);
        if(!task){
            return res.status(400).json({message: "Task not found"});
        };

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.completed = completed || task.completed;

        await task.save();
        res.status(200).json({message: "Task updated", task});
    } catch (error) {
        console.error("Error in updateTask controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete a task
export const deleteTask = asyncHandler(async (req,res) => {
    const userId = req.user._id;
    const { taskId } = req.params;

    if(!userId || !taskId){
        return res.status(400).json({message: "Unauthorized access or TaskId not found"});
    };

    try {
        const task = await TaskModel.findById(taskId);
        if(!task){
            return res.status(400).json({message: "Task not found"});
        };

        await TaskModel.findByIdAndDelete(taskId);
        res.status(200).json({message: "Task deleted"});
        
    } catch (error) {
        console.error("Error in deleteTask controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update task completion status
export const completeTask = asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.params;

        // Find task by ID
        const task = await TaskModel.findById(taskId);  // Use TaskModel instead of Task
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Toggle the 'completed' field
        task.completed = !task.completed;

        if(task.completed){
            task.status = "inactive";
        }
        await task.save();

        return res.status(200).json({ message: "Task status updated", task });
    } catch (error) {
        console.error("Error updating task completion:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

