import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

const MonthlyMoodCalendar = () => {
    const [moods, setMoods] = useState([]);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1); // January is 0, so add 1
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const res = await axiosInstance.get(`/moods/monthly/${month}/${year}`);
                console.log(res.data);
                setMoods(res.data);
            } catch (error) {
                console.error("Error fetching monthly moods:", error.response?.data || error.message);
                setError(error.response?.data || error.message);
            }
        };
        fetchMoods();
    }, [month, year]);

    const getColor = (mood) => {
        switch (mood) {
            case "happy": return "#4CAF50";  
            case "sad": return "#2196F3";    
            case "neutral": return "#9E9E9E"; 
            case "stressed": return "#FF9800"; 
            case "angry": return "#F44336";  
            default: return "#E0E0E0"; 
        }
    };

    const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month - 1, 1).getDay();

    const daysInMonth = getDaysInMonth(month, year);
    const firstDayIndex = getFirstDayOfMonth(month, year); // 0 for Sunday, 1 for Monday, etc.

    const handlePrevMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const getMostFrequentMood = (moods) => {
        const moodCounts = moods.reduce((acc, mood) => {
            acc[mood] = (acc[mood] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    };

    const groupedMoods = moods.reduce((acc, mood) => {
        const date = new Date(mood.date).getDate();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(mood.mood);
        return acc;
    }, {});

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                <button onClick={handlePrevMonth} style={buttonStyle}>{"<"}</button>
                <h2 style={{ margin: "0 20px" }}>{new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</h2>
                <button onClick={handleNextMonth} style={buttonStyle}>{">"}</button>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 40px)",
                gap: "5px",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
                {/* Days of the week headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} style={{ fontWeight: "bold", padding: "5px 0" }}>{day}</div>
                ))}

                {/* Empty slots before first day of month */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ width: "40px", height: "40px", visibility: "hidden" }}></div>
                ))}

                {/* Calendar Days */}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const date = day + 1;
                    const moodsForDay = groupedMoods[date] || [];
                    const mostFrequentMood = moodsForDay.length > 0 ? getMostFrequentMood(moodsForDay) : null;
                    return (
                        <div
                            key={day}
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: mostFrequentMood ? getColor(mostFrequentMood) : "#E0E0E0",
                                borderRadius: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "black",
                                cursor: "pointer",
                                position: "relative"
                            }}
                            title={mostFrequentMood ? `${mostFrequentMood} (${date})` : "No mood logged"}
                        >
                            {date}

                            {/* Tooltip on hover */}
                            {mostFrequentMood && (
                                <span
                                    style={{
                                        position: "absolute",
                                        bottom: "110%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                                        color: "#fff",
                                        padding: "4px 8px",
                                        borderRadius: "5px",
                                        fontSize: "12px",
                                        whiteSpace: "nowrap",
                                        visibility: "hidden",
                                        opacity: 0,
                                        transition: "opacity 0.2s, visibility 0.2s"
                                    }}
                                    className="tooltip"
                                >
                                    {new Date(year, month - 1, date).toLocaleDateString()} - {mostFrequentMood}
                                </span>
                            )}
                        </div>
                    );
                })}
                {error && <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>}
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: "5px 10px",
    borderRadius: "25%",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#FFF",
    cursor: "pointer",
    fontSize: "16px",
    margin: "0 10px"
};

export default MonthlyMoodCalendar;