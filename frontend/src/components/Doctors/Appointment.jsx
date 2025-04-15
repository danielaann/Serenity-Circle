import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets, doctors } from "../../assets_doc/assets_frontend/assets.js";
import RelatedDoctors from './RelatedDoctors.jsx';
import { axiosInstance } from '../../lib/axios.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import toast from 'react-hot-toast';

const Appointment = () => {
    const { authUser } = useAuthStore();
    const { docId } = useParams();
    const [docInfo, setDocInfo] = useState(null);

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const fetchDocInfo = async () => {
        try {
            const { data } = await axiosInstance.get(`/doctor/profile/${docId}`);
            setDocInfo(data);
        } catch (error) {
            console.error("Error fetching doctor:", error.message);
            toast.error("Failed to load doctor info");
        }
        // console.log(docInfo);
    };

    const getAvailableSlots = async (params) => {
        setDocSlots([]);

        //get current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            //getting date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);     //getting future days

            //setting end time of the date with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formatedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                //add slot to array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formatedTime
                })

                //increment time by 30 mins
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));
        }
    }


    const bookApointment = async (params) => {
        try {
            const date = docSlots[slotIndex][0].datetime

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + '_' + month + '_' + year;

            if (!authUser) {
                toast.error("User is not authenticated.");
                return;
            }

            const userId = authUser._id;
            console.log({ userId, docId, slotDate, slotTime }); // Log the payload

            await axiosInstance.post('/appointment/book-appointment', {
                userId,
                docId,
                slotDate,
                slotTime
            });

            console.log("Appointment booked successfully");

            toast.success("Appointment booked successfully");

        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
            console.error("API error:", error);
        }
    }

    useEffect(() => {
        fetchDocInfo();
    }, [docId]);

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots])

    if (!docInfo) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='w-[65%] mt-2 mx-2'>
                {/* Doctor details */}
                <div className='flex flex-col sm:flex-row gap-4'>
                    <div>
                        <img className='bg-primary sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
                    </div>

                    <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                        {/* Doc Info */}
                        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                            {docInfo.name}
                            <img className='w-5' src={assets.verified_icon} alt="Verified" />
                        </p>
                        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                            <p>{docInfo.degree} - {docInfo.speciality}</p>
                            <button className='py-0.5 px-2 text-sm rounded-full'>{docInfo.experience}</button>
                        </div>

                        {/* Doc About */}
                        <div>
                            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About<img src={assets.info_icon} /></p>
                            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                        </div>
                        <p className='text-gray-500 font-medium mt-4'>
                            Appointment Fee: $<span className='text-gray-600'>{docInfo.fee}</span>
                        </p>
                    </div>
                </div>

                {/* Booking slots */}
                <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                    <p>Booking Slots:</p>
                    <div className='flex gap-3 items-center mt-4'>
                        {docSlots.length > 0 &&
                            docSlots.map((item, index) => (
                                <div
                                    onClick={() => setSlotIndex(index)}
                                    key={index}
                                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-accent' : 'border border-gray-200'}`}
                                >
                                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                    <p>{item[0] && item[0].datetime.getDate()}</p>
                                </div>
                            ))}
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2 overflow-x-auto'>
                        {docSlots.length &&
                            docSlots[slotIndex].map((item, index) => (
                                <p
                                    onClick={() => setSlotTime(item.time)}
                                    key={index}
                                    className={`text-sm font-light px-4 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-secondary' : 'text-gray-400 border border-gray-300'}`}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))}
                    </div>
                    <button className='bg-primary text-sm font-light px-14 py-3 rounded-full my-6' onClick={bookApointment}>
                        Book an Appointment
                    </button>
                </div>
            </div>

            <div className='w-[1500px]'>
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        </>
    );
};

export default Appointment;