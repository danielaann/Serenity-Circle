import React, { useState } from 'react';
import MoodTracker from '../components/Mood Tracker/MoodTracker';
import YearlyMoodGrid from '../components/Mood Tracker/YearlyMoodGrid';
import MonthlyMoodCalendar from '../components/Mood Tracker/MonthlyMoodCal';
import WeeklyMoodChart from '../components/Mood Tracker/WeeklyMoodChart';

function Dashboard() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div className='container mx-2 my-2 w-[80%]'>
      <div>
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <MoodTracker onMoodAdded={handleReload} />

        <h3 className="text-lg font-semibold mb-2">Mood Tracker</h3>
        <p className="text-gray-600 mb-4">Track your mood and well-being over time.</p>
        <div className="flex flex-wrap md:flex-nowrap justify-center items-start gap-4">
          <div className="w-full md:w-1/3 flex items-center">
            <MonthlyMoodCalendar reload={reload} />
          </div>
          <div className="w-full md:w-1/2">
            <WeeklyMoodChart reload={reload} />
          </div>
        </div>
        <YearlyMoodGrid reload={reload} />
      </div>
    </div>
  );
}

export default Dashboard;