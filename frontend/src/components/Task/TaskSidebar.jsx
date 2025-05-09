import React, { useEffect } from 'react';
import RadioChart from './RadioChart';

const TaskSidebar = ({ tasks, loading }) => {

  return (
    <div className='right-0 top-0 w-[15rem] bg-base-200 rounded-[0.3rem] mx-3 p-2'>
      <div className='px-2 py-4 mt-1 flex items-center rounded-[0.8rem] border-2 transition duration-300 ease-in-out cursor-pointer border-transparent hover:border-2 hover:border-white'>
        {/* carasol of motivation */}
      </div>

      {/* The task values grid */}
      <div className='mt-6 flex flex-col gap-8 px-2'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-grey-400'>
            <p>Total Tasks:</p>
            <p className='pl-4 relative flex gap-3'>
              <span className='absolute h-[70%] w-[0.3rem] lesft-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]'></span>
              <span className='ml-3 text-font-medium text-4xl text-[#333]'>{tasks.length}</span>
            </p>
          </div>

          <div className='text-grey-400'>
            <p>In Progress:</p>
            <p className='pl-3 relative flex gap-3'>
              <span className='absolute h-[70%] w-[0.3rem] lesft-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]'></span>
              <span className='ml-4 text-font-medium text-4xl text-[#333]'>{tasks.filter(task => !task.completed).length}</span>
            </p>
          </div>

          <div className='text-grey-400'>
            <p>Overdue:</p>
            <p className='pl-3 relative flex gap-3'>
              <span className='absolute h-[70%] w-[0.3rem] lesft-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]'></span>
              <span className='ml-4 text-font-medium text-4xl text-[#333]'>
                {
                  tasks.filter(task => {
                    if (!task.dueDate) return false; // Ignore tasks without due date

                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);

                    const taskDueDate = new Date(task.dueDate);
                    taskDueDate.setHours(0, 0, 0, 0);

                    return taskDueDate < currentDate && !task.completed; // Count overdue and incomplete tasks
                  }).length
                }
              </span>
            </p>
          </div>

          <div className='text-grey-400'>
            <p>Completed:</p>
            <p className='pl-3 relative flex gap-3'>
              <span className='absolute h-[70%] w-[0.3rem] lesft-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]'></span>
              <span className='ml-4 text-font-medium text-4xl text-[#333]'>
                {tasks.filter(task => task.completed).length}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/*  */}
      <h3 className='mt-8 font-medium'>Activity:</h3>
      <h4 className="font-semibold flex justify-center text-sm text-center mt-6">
        Completed vs Pending Task
      </h4>
      <div className='mx-6'>
        <RadioChart task={tasks} />
      </div>

    </div>
  )
}

export default TaskSidebar;
