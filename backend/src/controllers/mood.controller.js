import Mood from "../models/mood.model.js";

export const addMood = async (req, res) => {
  try {
    const userId = req.user._id; // Extracted from JWT
    const { mood, moodEmoji, note, date } = req.body;

    if (!mood || !moodEmoji) {
      return res.status(400).json({ message: "Mood and emoji are required" });
    }

    const newMood = new Mood({ userId, mood, moodEmoji, note, date });
    await newMood.save();

    res.status(201).json({ message: "Mood Logged", newMood });
  } catch (error) {
    console.error("Error in addMood controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMoods = async (req, res) => {
  try {
    const userId = req.user._id; // Extract from JWT
    const moods = await Mood.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      error: false,
      moods,
      message: "All moods retrieved successfully!"
    });

  } catch (error) {
    console.error("Error in getMoods controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Yearly Moods
export const getYearlyMoods = async (req, res) => {
  try {
      const userId = req.user._id;  // Extracted from JWT
      const moods = await Mood.find({ userId }).sort({ date: 1 });
      res.json(moods);
  } catch (error) {
      console.error("Error fetching yearly moods:", error.message);
      res.status(500).json({ message: "Internal server error" });
  }
};

export const getMonthlyMoods = async (req, res) => {
  const { month, year } = req.params;
  const userId = req.user._id; // Add this line

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const moods = await Mood.find({
      userId, // Filter by user
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getWeeklyMoods = async (req, res) => {
  const { startDate } = req.params;
  const userId = req.user._id; // Add this line

  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  try {
    const moods = await Mood.find({
      userId, // Filter by user
      date: {
        $gte: start,
        $lte: end,
      },
    });

    res.status(200).json(moods);
  } catch (error) {
    console.error("Error fetching weekly moods:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
