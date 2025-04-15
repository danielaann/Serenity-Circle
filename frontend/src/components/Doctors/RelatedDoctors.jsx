import React, { useEffect, useState } from 'react';
import { assets, doctors } from "../../assets_doc/assets_frontend/assets.js";
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {

    const [relDoc , setRelDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col w-[90%] items-center mx-2 gap-4 my-16 text-gray-900'>
            <h1 className='text-3xl font-medium text-center'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>
            <div className=' w-[60%] max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5'>
                {relDoc.slice(0,5).map((item, index) => (
                    <div
                        className='border border-neutral rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                        }}
                    >
                        <img className='bg-primary w-full h-40 object-contain' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                <p>Available</p>
                            </div>
                            <p className='font-medium text-gray-900 text-lg'>{item.name}</p>
                            <p className='text-gray-600 text-sm '>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className='bg-blue-500 text-white px-6 py-2 rounded-full mt-6 hover:bg-blue-600'>More</button>
        </div>
    );
}

export default RelatedDoctors;