import { useState } from "react";
import { axiosInstance } from "../../lib/axios.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [moods, setMoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  

  const moodOptions = [
    { label: "😊 Happy", value: "happy", emoji: "😊" },
    { label: "😞 Sad", value: "sad", emoji: "😞" },
    { label: "😐 Neutral", value: "neutral", emoji: "😐" },
    { label: "😕 Stressed", value: "stressed", emoji: "😕" },
    { label: "😡 Angry", value: "angry", emoji: "😡" },
];

// When user selects a mood:
const handleMoodSubmit = async () => {
  try {
      if (!mood.trim()) {
          alert("Please select a mood.");
          return;
      }

      const selectedMood = moodOptions.find(m => m.value === mood); // ✅ Get emoji

      const response = await axiosInstance.post("/moods/add", {
          mood: selectedMood.value,
          moodEmoji: selectedMood.emoji, // ✅ Send emoji
          note,
          date: selectedDate || new Date(),
      });

      if (response.status === 201) {
          console.log("Mood logged successfully!", response.data);
          setShowModal(false);
          fetchMoods();  // ✅ Refresh moods after adding
      } else {
          console.error("Failed to log mood:", response.data);
      }
  } catch (error) {
      console.error("Error adding mood:", error.response?.data || error.message);
  }
};



  const fetchMoods = async () => {
    try {
      const res = await axiosInstance.get("/mood/get-moods");
      setMoods(res.data.moods);
    } catch (error) {
      console.error("Error fetching moods:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <button 
        onClick={() => setShowModal(true)} 
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Mood
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-3">Add Mood to Calendar</h2>

            <label className="block mb-2">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">How was your day?</label>
            <div className="flex justify-between mb-3">
              {moodOptions.map((m) => (
                <button 
                  key={m.value} 
                  onClick={() => setMood(m.value)} 
                  className={`p-2 text-lg border rounded-lg ${mood === m.value ? 'bg-blue-300' : ''}`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <textarea
              placeholder="Maybe add why your day was good..."
              className="w-full p-2 border rounded mb-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex justify-between">
              <button 
                className="bg-gray-400 text-white p-2 rounded" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 text-white p-2 rounded" 
                onClick={handleMoodSubmit}
              >
                Add Mood
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="mt-5 text-lg font-semibold">Previous Moods</h3>
      <ul>
        {moods.map((m, index) => (
          <li key={index} className="p-2 border-b">
            {m.date}: {m.mood} - {m.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodTracker;
