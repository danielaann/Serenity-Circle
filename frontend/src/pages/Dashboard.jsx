import React from 'react'
import MoodTracker from '../components/Mood Tracker/MoodTracker';
import YearlyMoodGrid from '../components/Mood Tracker/YearlyMoodGrid';
import MonthlyMoodCalendar from '../components/Mood Tracker/MonthlyMoodCal';
import MoodRadarChart from '../components/Mood Tracker/MoodChart';
import WeeklyMoodChart from '../components/Mood Tracker/WeeklyMoodChart';

function Dashboard() {

  return (
    <div className='container mx-2 my-2'>
         <div>
          Dashboard
          <MoodTracker/>
          <YearlyMoodGrid/>
          <MonthlyMoodCalendar/>
          <WeeklyMoodChart/>
          {/* <MoodRadarChart/> */}
        </div>
    </div>
   
  )
}

export default Dashboard;2