import React, { useEffect, useState } from "react";
import { doctors } from "../assets_doc/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
    const navigate = useNavigate();

    // State to store filtered doctors
    const [filterDoc, setFilterDoc] = useState(doctors);

    // State to store selected speciality
    const [speciality, setSpeciality] = useState("");

    // Function to filter doctors based on selected speciality
    const applyFilter = (selectedSpeciality) => {
        setSpeciality(selectedSpeciality);
        if (selectedSpeciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === selectedSpeciality));
        } else {
            setFilterDoc(doctors);
        }
    };

    // Apply filter when the component mounts
    useEffect(() => {
        applyFilter(speciality);
    }, [speciality]);

    return (
        <div className="max-w-screen-xl mx-2 mt-2">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Side - Specialities List */}
                <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-md sticky top-4 h-fit">
                    <h2 className="text-lg font-semibold mb-4">Browse Specialities</h2>
                    {["Pyscologist", "Neurologist", "Psychiatrists"].map((spec, index) => (
                        <p
                            key={index}
                            onClick={() => applyFilter(spec)}
                            className={`cursor-pointer py-2 px-4 rounded-md 
                            ${speciality === spec ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
                        >
                            {spec}
                        </p>
                    ))}
                    <p
                        onClick={() => applyFilter("")}
                        className="cursor-pointer py-2 px-4 text-red-500 mt-2 hover:bg-red-100 rounded-md"
                    >
                        Show All
                    </p>
                </div>

                {/* Right Side - Doctors List */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterDoc.length === 0 ? (
                        <p className="text-gray-500 text-center col-span-3">No doctors found.</p>
                    ) : (
                        filterDoc.map((doctor, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/appointment/${doctor._id}`)}
                                className="cursor-pointer shadow-md border rounded-lg overflow-hidden hover:shadow-lg transition"
                            >
                                <img
                                    className="w-full h-40 object-contain"
                                    src={doctor.image}
                                    alt={doctor.name}
                                />
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-green-500">
                                        <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                        <p>Available</p>
                                    </div>
                                    <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                                    <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;