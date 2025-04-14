import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

const YearlyMoodGrid = ({ reload }) => {
    const [moods, setMoods] = useState([]);
    const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const res = await axiosInstance.get("/moods/yearly");
                setMoods(res.data);
            } catch (error) {
                console.error("Error fetching yearly moods:", error.response?.data || error.message);
            }
        };
        fetchMoods();
    }, [reload]); // Add reload to the dependency array

    const getColor = (mood) => {
        switch (mood) {
            case "happy":
                return "#4CAF50"; // Green
            case "sad":
                return "#2196F3"; // Blue
            case "neutral":
                return "#9E9E9E"; // Gray
            case "stressed":
                return "#FF9800"; // Orange
            case "angry":
                return "#F44336"; // Red
            default:
                return "#E0E0E0"; // Light gray for empty days
        }
    };

    const getDayOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const getMostFrequentMood = (moods) => {
        const moodCounts = moods.reduce((acc, mood) => {
            acc[mood] = (acc[mood] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    };

    const groupedMoods = moods.reduce((acc, mood) => {
        const dayOfYear = getDayOfYear(new Date(mood.date));
        if (!acc[dayOfYear]) {
            acc[dayOfYear] = [];
        }
        acc[dayOfYear].push(mood.mood);
        return acc;
    }, {});

    return (
        <div className="w-fit p-1">
        <h2 className="text-2xl font-semibold">Yearly Mood</h2>
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(57, 20px)", // Adjusted the size of the boxes
                gridGap: "2px",
                padding: "10px",
                backgroundColor: "#F5F5F5",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "relative",
            }}
        >
            
            {Array.from({ length: 365 }).map((_, i) => {
                const moodsForDay = groupedMoods[i + 1] || [];
                const mostFrequentMood = moodsForDay.length > 0 ? getMostFrequentMood(moodsForDay) : null;
                const date = mostFrequentMood ? new Date(new Date().getFullYear(), 0, i + 1).toLocaleDateString() : "";

                return (
                    <div
                        key={i}
                        className="relative group cursor-pointer"
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: mostFrequentMood ? getColor(mostFrequentMood) : "#E0E0E0",
                            borderRadius: "3px",
                        }}
                    >
                        {mostFrequentMood && (
                            <span
                                className="absolute left-1/2 bottom-full mb-1 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-200 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
                                style={{ minWidth: "max-content" }}
                            >
                                {date} - {mostFrequentMood}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
        </div>
    );
};

export default YearlyMoodGrid;