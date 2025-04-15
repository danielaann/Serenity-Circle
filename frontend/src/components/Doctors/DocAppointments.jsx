import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-custom.css';
import { axiosInstance } from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import { FaSpinner } from 'react-icons/fa'; // Optional: Add a spinner icon library like react-icons

const DoctorAppointmentDashboard = () => {
  const { authUser } = useAuthStore();
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Get all unique dates that have appointments
  const appointmentDates = [...new Set(appointments.map(appt => appt.slotDate))]; // Remove duplicates

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!authUser || authUser.role !== 'doctor') {
        console.error('No authenticated doctor or invalid role');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const docId = authUser._id; // Extract docId from authUser
        const res = await axiosInstance.get('appointment/doctor/appointments', {
          params: { docId } // Send docId as query parameter
        });
        setAppointments(res.data.appointments || []);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [authUser]);

  // Convert response date format (DD_M_YYYY) to YYYY-MM-DD for comparison
  const normalizeSlotDate = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Ensure two digits
  };

  // Format selected date to YYYY-MM-DD using local date components
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Debug log to verify date matching
  const filteredAppointments = appointments.filter(appt => {
    const normalizedSlot = normalizeSlotDate(appt.slotDate);
    const selectedDateStr = formatDate(selectedDate);
    console.log('Comparing:', { normalizedSlot, selectedDateStr, rawSelected: selectedDate });
    return normalizedSlot === selectedDateStr;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-[80%] min-h-screen bg-base p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
          Appointments Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Column */}
          <div className="md:col-span-1 bg-base-200 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Date</h2>
            <Calendar
              onChange={(date) => {
                console.log('Calendar selected date:', date);
                setSelectedDate(date);
              }}
              value={selectedDate}
              tileClassName={({ date, view }) => {
                const dateStr = formatDate(date);
                const todayStr = formatDate(new Date());

                if (appointmentDates.some(ad => normalizeSlotDate(ad) === dateStr)) {
                  return 'highlight-appointment';
                }

                if (dateStr === todayStr) {
                  return 'highlight-today';
                }

                return null;
              }}
              className="w-full"
            />
          </div>

          {/* Appointments Column */}
          <div className="md:col-span-2 bg-base p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Appointments on {formatDate(selectedDate)}
            </h2>

            {filteredAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No appointments for this day.</p>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appt) => (
                  <div
                    key={appt._id}
                    className="bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-200"
                  >
                    <p className="text-lg font-medium text-gray-800"><strong>Time:</strong> {appt.slotTime}</p>
                    <p className="text-gray-600"><strong>Patient:</strong> {appt.userData?.email}</p>
                    <p className="text-gray-600"><strong>Payment:</strong> {appt.payment ? 'Paid' : 'Not Paid'}</p>
                    <p className="text-gray-600"><strong>Cancelled:</strong> {appt.cancelled ? 'Yes' : 'No'}</p>
                    <p className="text-gray-600"><strong>Completed:</strong> {appt.isCompleted ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentDashboard;