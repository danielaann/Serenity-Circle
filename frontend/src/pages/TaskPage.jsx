import React from 'react'
import MiniSidebar from '../components/Task/MiniSidebar';
import TaskHeader from '../components/Task/TaskHeader';
import MainTask from '../components/Task/MainTask';
import TaskSidebar from '../components/Task/TaskSidebar';

const TaskPage = () => {
  return (
    <div className='container h-[89vh] flex overflow-hidden m-2'>
        <MiniSidebar/>
        <div className='flex-1 flex flex-col'>
            <div className='flex flex-1'>
                <MainTask className='flex-1'/>
                <TaskSidebar className='w-[15rem]'/>
            </div>
        </div>
    </div>
  )
}

export default TaskPage;