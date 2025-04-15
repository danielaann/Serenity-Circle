import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore.js';

const BookedAppointments = () => {
  const { authUser } = useAuthStore();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!authUser?._id) return;

        const { data } = await axiosInstance.get(`/appointment/appointments/${authUser._id}`);
        // Combine and sort all appointments by date (most recent first)
        const allAppointments = [...data.upcoming, ...data.past].sort((a, b) => {
          const dateA = new Date(`${a.slotDate.split('_').join('/')} ${a.slotTime}`);
          const dateB = new Date(`${b.slotDate.split('_').join('/')} ${b.slotTime}`);
          return dateB - dateA;
        });
        setAppointments(allAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      }
    };

    fetchAppointments();
  }, [authUser]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Invalid date';

    try {
      const [day, month, year] = dateStr.split('_');
      const dayWithSuffix = getDayWithSuffix(day);

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthAbbr = months[parseInt(month, 10) - 1];

      return `${dayWithSuffix} ${monthAbbr} ${year}`;
    } catch {
      return 'Invalid date format';
    }
  };

  const getDayWithSuffix = (day) => {
    const dayInt = parseInt(day, 10);
    if (dayInt >= 11 && dayInt <= 13) return `${day}th`;
    switch (dayInt % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  const getAppointmentStatus = (dateStr) => {
    const [day, month, year] = dateStr.split('_').map(Number);
    const today = new Date();
    const appointmentDate = new Date(year, month - 1, day);
    const todayStripped = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (appointmentDate < todayStripped) {
      return { label: 'Past', color: 'text-gray-600' };
    } else if (appointmentDate.getTime() === todayStripped.getTime()) {
      return { label: 'Today', color: 'text-red-600 font-semibold' };
    } else {
      return { label: 'Upcoming', color: 'text-green-600' };
    }
  };

  return (
    <div className=' w-[80%] mt-8 mx-4 sm:mx-8 lg:mx-16'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>My Appointments</h1>

      {/* All Appointments */}
      {appointments.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {appointments.map((appointment) => {
            const status = getAppointmentStatus(appointment.slotDate);
            return (
              <div
                key={appointment._id}
                className='bg-base-200 p-4 rounded-lg shadow-md border border-base-300 hover:shadow-lg transition-shadow'
              >
                <p className='text-gray-600 font-semibold'>Doctor: {appointment.docData?.name || 'N/A'}</p>
                <p className='text-gray-800 font-medium'>Date: {formatDate(appointment.slotDate)}</p>
                <p className='text-gray-800 font-medium'>Time: {appointment.slotTime.toUpperCase()}</p>
                <p className={`mt-2 ${status.color}`}>Status: {status.label}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className='text-gray-500 text-center'>No appointments booked yet.</p>
      )}
    </div>
  );
};

export default BookedAppointments;