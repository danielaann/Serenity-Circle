import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";

const SleepTracker = () => {
  const [sleepLogs, setSleepLogs] = useState([]);
  const [hoursSlept, setHoursSlept] = useState("");
  const [sleepQuality, setSleepQuality] = useState("average");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Default to today (YYYY-MM-DD)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  ); // YYYY-MM

  // Fetch sleep logs
  const fetchSleepLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/sleep/get-sleep");
      setSleepLogs(res.data);
    } catch (err) {
      setError("Failed to load sleep logs. Please try again.");
      console.error("Fetch sleep logs error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Log sleep data
  const handleLogSleep = async (e) => {
    e.preventDefault();
    if (!hoursSlept || !sleepQuality || !selectedDate) {
      setError("Please enter hours slept, select sleep quality, and choose a date.");
      return;
    }
    setError(null);
    try {
      await axiosInstance.post("/sleep/add-sleep", {
        hoursSlept: Number(hoursSlept),
        sleepQuality,
        date: selectedDate, // Send YYYY-MM-DD
      });
      setHoursSlept("");
      setSleepQuality("average");
      setSelectedDate(new Date().toISOString().slice(0, 10)); // Reset to today
      fetchSleepLogs();
    } catch (err) {
      setError("Failed to log sleep. Please try again.");
      console.error("Log sleep error:", err.message);
    }
  };

  // Calculate monthly stats
  const getMonthlyStats = () => {
    const filteredLogs = sleepLogs.filter((log) => {
      const logMonth = new Date(log.date).toISOString().slice(0, 7);
      return logMonth === selectedMonth;
    });

    if (filteredLogs.length === 0) {
      return { averageHours: 0, qualityBreakdown: { poor: 0, average: 0, good: 0 } };
    }

    const totalHours = filteredLogs.reduce((sum, log) => sum + log.hoursSlept, 0);
    const averageHours = (totalHours / filteredLogs.length).toFixed(1);

    const qualityBreakdown = filteredLogs.reduce(
      (acc, log) => {
        acc[log.sleepQuality] = (acc[log.sleepQuality] || 0) + 1;
        return acc;
      },
      { poor: 0, average: 0, good: 0 }
    );

    return { averageHours, qualityBreakdown };
  };

  // Get unique months for dropdown
  const getAvailableMonths = () => {
    const months = new Set(
      sleepLogs.map((log) => new Date(log.date).toISOString().slice(0, 7))
    );
    return [...months].sort().reverse(); // Newest first
  };

  // Get today's date for max attribute
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  useEffect(() => {
    fetchSleepLogs();
  }, []);

  const { averageHours, qualityBreakdown } = getMonthlyStats();

  return (
    <div className="w-[85%] bg-base flex flex-col p-4">
      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 flex-grow">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">😴</span> Sleep Tracker
          </h2>
          <p className="text-sm text-gray-500">
            Log your sleep and track daily and monthly patterns
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Sleep Log Form */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Log Your Sleep
          </h3>
          <form
            onSubmit={handleLogSleep}
            className="flex gap-3 items-center flex-wrap"
          >
            <input
              type="number"
              value={hoursSlept}
              onChange={(e) => setHoursSlept(e.target.value)}
              placeholder="Hours slept"
              min="0"
              max="24"
              step="0.5"
              className="p-2 border rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sleepQuality}
              onChange={(e) => setSleepQuality(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={today} // Restrict to today and past
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!hoursSlept || !sleepQuality || !selectedDate || isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              Save
            </button>
          </form>
        </div>

        {/* Monthly Stats */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700">
              Monthly Overview
            </h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {getAvailableMonths().length === 0 ? (
                <option value="">No data</option>
              ) : (
                getAvailableMonths().map((month) => (
                  <option key={month} value={month}>
                    {new Date(month + "-01").toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </option>
                ))
              )}
            </select>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : sleepLogs.length === 0 || getAvailableMonths().length === 0 ? (
            <p className="text-gray-500">No sleep data available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Average Hours Slept:</span>{" "}
                  {averageHours} hrs
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Quality Breakdown:</span>
                  <br />
                  Poor: {qualityBreakdown.poor} days
                  <br />
                  Average: {qualityBreakdown.average} days
                  <br />
                  Good: {qualityBreakdown.good} days
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Daily Logs */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Daily Sleep Logs
          </h3>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : sleepLogs.length === 0 ? (
            <p className="text-gray-500">No sleep logs yet. Start logging above!</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sleepLogs
                .filter((log) => new Date(log.date).toISOString().slice(0, 7) === selectedMonth)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((log) => (
                  <div
                    key={log._id}
                    className="p-3 bg-white rounded-lg shadow-sm border flex justify-between items-center"
                  >
                    <p className="text-gray-700">
                      {log.hoursSlept} hours,{" "}
                      <span
                        className={`font-semibold ${
                          log.sleepQuality === "good"
                            ? "text-green-600"
                            : log.sleepQuality === "average"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {log.sleepQuality}
                      </span>{" "}
                      quality
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(log.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;