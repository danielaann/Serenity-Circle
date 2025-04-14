import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { axiosInstance } from '../../lib/axios';
import 'chart.js/auto';

const WeeklyMoodChart = ({ reload }) => {
    const [moods, setMoods] = useState([]);
    const [error, setError] = useState(null);
    const getLastSunday = () => {
        const today = new Date();
        const day = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - day); // Go back to Sunday
        lastSunday.setHours(0, 0, 0, 0); // Reset time
        return lastSunday;
    };
    
    const [startDate, setStartDate] = useState(getLastSunday());
    

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const res = await axiosInstance.get(`/moods/weekly/${startDate.toISOString()}`);
                console.log(res.data);
                setMoods(res.data);
            } catch (error) {
                console.error("Error fetching weekly moods:", error.response?.data || error.message);
                setError(error.response?.data || error.message);
            }
        };
        fetchMoods();
    }, [startDate, reload]); // Add reload to the dependency array

    const handlePrevWeek = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 7);
        setStartDate(newStartDate);
    };

    const handleNextWeek = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 7);
        setStartDate(newStartDate);
    };

    const moodMap = {
        "happy": 5,
        "sad": 1,
        "neutral": 3,
        "stressed": 2,
        "angry": 4
    };

    const getMoodLabel = (value) => {
        switch (value) {
            case 5: return "😊";
            case 1: return "😢";
            case 3: return "😐";
            case 2: return "😰";
            case 4: return "😡";
            default: return "😶";
        }
    };

    const getMoodColor = (mood) => {
        switch (mood) {
            case "happy": return "#4CAF50";
            case "sad": return "#2196F3";
            case "neutral": return "#9E9E9E";
            case "stressed": return "#FF9800";
            case "angry": return "#F44336";
            default: return "#E0E0E0";
        }
    };

    const labels = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date.toLocaleDateString();
    });

    const groupedMoods = moods.reduce((acc, mood) => {
        const date = new Date(mood.date).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(mood.mood);
        return acc;
    }, {});

    const mostFrequentMoods = labels.map(label => {
        const moodsForDay = groupedMoods[label] || [];
        if (moodsForDay.length === 0) return null;
        const moodCounts = moodsForDay.reduce((acc, mood) => {
            acc[mood] = (acc[mood] || 0) + 1;
            return acc;
        }, {});
        const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
        return moodMap[mostFrequentMood];
    });

    const filteredMoods = mostFrequentMoods.map((mood, index) => {
        return mood !== null ? { x: labels[index], y: mood } : null;
    }).filter(mood => mood !== null);

    const data = {
        labels,
        datasets: [
            {
                label: 'Mood',
                data: filteredMoods,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: filteredMoods.map(mood => getMoodColor(Object.keys(moodMap).find(key => moodMap[key] === mood.y))),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: filteredMoods.map(mood => getMoodColor(Object.keys(moodMap).find(key => moodMap[key] === mood.y))),
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return getMoodLabel(value);
                    },
                },
            },
        },
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                <button onClick={handlePrevWeek} style={buttonStyle}>{"<"}</button>
                <h2 style={{ margin: '0 20px' }}>
                    Weekly Mood: {labels[0]} - {labels[6]}
                </h2>
                <button onClick={handleNextWeek} style={buttonStyle}>{">"}</button>
            </div>
            <Line data={data} options={options} />
            {error && <div style={{ color: 'red', marginTop: '10px' }}>Error: {error}</div>}
        </div>
    );
};

const buttonStyle = {
    padding: '5px 10px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#FFF',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '0 10px',
};

export default WeeklyMoodChart;