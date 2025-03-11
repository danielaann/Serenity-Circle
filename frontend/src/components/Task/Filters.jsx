import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Filters = ({setPriority, priority}) => {
    const priorities = ['all','low','medium','high'];

    const [activeIndex,setActiveIndex] = useState(priorities.indexOf(priority));

    useEffect(() => {
      setActiveIndex(priorities.indexOf(priority));
    },[priority]);
  
    return (
    <div className='relative focus:outline-none py-2 px-2 grid grid-cols-4 gap-3 items-center bg-primary border-2 rounded-md'>
        <span className='absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300' 
            style={{
                width: 'calc(100%/4 - 10px)',
                height: 'calc(100% - 10px)',
                top: "50%",
                transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 10}px)) translateY(-50%)`,
                transition: "transform 400ms cubic-bezier(.95, .03, 1, 1)",
            }}
        >
        </span>

        {priorities.map((p, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveIndex(index); 
            setPriority(p);
          }}
          className={`relative px-1 z-10 font-medium text-sm ${
            activeIndex === index ? 'text-black' : 'text-white'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  )
};

//prop type validation
Filters.propTypes = {
  setPriority: PropTypes.func.isRequired,
    priority: PropTypes.string.isRequired  
};


export default Filters;