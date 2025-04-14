import SleepModel from "../models/sleep.model.js";

// Create a new sleep log
export const createSleepLog = async (req, res) => {
    try {
      const { hoursSlept, sleepQuality, date } = req.body; // Add date
      const userId = req.user.id;
  
      const sleepLog = new SleepModel({
        userId,
        hoursSlept,
        sleepQuality,
        ...(date && { date: new Date(date) }), // Use provided date or default
      });
  
      await sleepLog.save();
      res.status(201).json({ message: "Sleep logged successfully", sleepLog });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
export const getSleepLogs = async (req, res) => {
    try {
      const userId = req.user.id;
      const sleepLogs = await SleepModel.find({ userId }).populate("userId", "name");
      res.status(200).json(sleepLogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

