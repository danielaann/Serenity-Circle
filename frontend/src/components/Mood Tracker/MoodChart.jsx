import { Radar } from "react-chartjs-2";
import { Chart, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

// ✅ Register necessary components
Chart.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const MoodRadarChart = ({ moods = [] }) => {
    const moodCounts = { happy: 0, sad: 0, neutral: 0, stressed: 0, angry: 0 };

    if (Array.isArray(moods)) {
        moods.forEach(m => moodCounts[m.mood]++);
    }

    const data = {
        labels: ["Happiness", "Sadness", "Neutral", "Stress", "Anger"],
        datasets: [{
            label: "Mood Levels",
            data: [moodCounts.happy, moodCounts.sad, moodCounts.neutral, moodCounts.stressed, moodCounts.angry],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
        }]
    };

    return <Radar data={data} />;
};

export default MoodRadarChart;
