import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import Filters from './Filters';

const MainTask = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const authUser = useAuthStore(state => state.authUser);
  const [priority, setPriority] = useState('all');

  //get all tasks
  const getTasks = async () => {
    setLoading(true);
    try{
      const response = await axiosInstance.get('/tasks/get-all-task');
      setTasks(response.data);
    }catch(error){
      console.log("Error in fetching Tasks:",error);
    }
    setLoading(false);
  };

  //get task by id
  const getTask = async (taskId) => {
    setLoading(true);
    try{
      const response = await axiosInstance.get(`/tasks/get-task/${taskId}`);
      setTask(response.data);
    }catch(error){
      console.log("Error in fetching Task:",error);
    }
    setLoading(false);
  };

  //create a task
  const createTask = async (task) => {
    setLoading(true);
    try{
      const response = await axiosInstance.post('/tasks/create',task);
      setTasks([...tasks,response.data]);
    }catch(error){
      console.log("Error in creating Task:",error);
    }
    setLoading(false);
  };

  //update a task
  const updateTask = async (task) => {
    setLoading(true);
    try{
      const response = await axiosInstance.put(`/tasks/update-task/${task._id}`,task);
      
      const newTasks = tasks.map((tsk)=>{
        return tsk._id === response.data._id ? response.data : tsk;
      });

      setTasks(newTasks);
    }catch(error){
      console.log("Error in updating Task:",error);
    }
    setLoading(false);
  };

  //delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try{
      await axiosInstance.delete(`/tasks/delete-task/${taskId}`);
      
      const newTasks = tasks.filter((tsk)=>
        tsk._id !== taskId
      );
     
      setTasks(newTasks);
    }catch(error){
      console.log("Error in deleting Task:",error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTasks();
  
    const taskId = "67cfcdbb2b442c520a1761be"; // Ensure this is valid
    if (taskId) {
      getTask(taskId);
    } else {
      console.warn("Invalid taskId:", taskId);
    }
  }, [authUser]);
  return (
    <div className='flex-1 h-full bg-base-100 border border-base-200 overflow-auto rounded-[0.3rem]'>
        <div className='m-6 flex justify-between' >
           <h1 className='text-3xl font-bold mt-1'>All Tasks</h1>
           <Filters setPriority={setPriority} priority={priority}/>
        </div>

    </div>
  )
}

export default MainTask;