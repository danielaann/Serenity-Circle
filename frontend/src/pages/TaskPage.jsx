import React, { useEffect, useState } from 'react'
import MiniSidebar from '../components/Task/MiniSidebar';
import TaskHeader from '../components/Task/TaskHeader';
import MainTask from '../components/Task/MainTask';
import TaskSidebar from '../components/Task/TaskSidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Completed from '../components/Task/Completed';
import Pending from '../components/Task/Pending';
import Overdue from '../components/Task/Overdue';
import { axiosInstance } from '../lib/axios';

const TaskPage = () => {

  return (
    <>
      <div className='container h-[89vh] flex overflow-hidden m-2'>
        <MiniSidebar />
        <div className="flex flex-1">
          <div className="w-[100%]">
            <Routes>
              <Route path="/" element={<MainTask taskType="all" />} />
              <Route path="completed" element={<Completed taskType="completed" />} />
              <Route path="pending" element={<Pending taskType="pending" />} />
              <Route path="overdue" element={<Overdue taskType="overdue" />} />
              <Route path="*" element={<Navigate to="/tasks" />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
