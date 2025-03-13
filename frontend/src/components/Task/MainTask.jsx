import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import Filters from './Filters';
import TaskItem from './TaskItem';
import AddEditTask from './AddEditTask';
import toast from 'react-hot-toast';

const MainTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [showModal, setShowModal] = useState(false);
  const authUser = useAuthStore(state => state.authUser);
  const [priority, setPriority] = useState('all');
  const [error, setError] = useState("");

  // Get all tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/tasks/get-all-task');
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.log("Error in fetching Tasks:", error);
    }
    setLoading(false);
  };

  // Get a single task
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/tasks/get-task/${taskId}`);
      setTask(response.data.task || {});
      setShowModal(true);
    } catch (error) {
      console.log("Error in fetching Task:", error);
    }
    setLoading(false);
  };

  // Create a task
  const createTask = async (task) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/tasks/create', task);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error in creating Task:", error);
    }
    setLoading(false);
  };

  // Update a task
  const updateTask = async (task) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/tasks/update-task/${task._id}`, task);
      const updatedTask = response.data.task;
      setTasks((prevTasks) => prevTasks.map((tsk) => (tsk._id === updatedTask._id ? updatedTask : tsk)));
    } catch (error) {
      console.log("Error in updating Task:", error);
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!task.title) {
      setError("Please enter the Title");
      return;
    }

    if (!task.description) {
      setError("Please enter some Content");
      return;
    }

    setError(""); // Clear error only after passing validation

    if (task._id) {
      await updateTask(task);
    } else {
      await createTask(task);
    }

    setShowModal(false);
    setTask({});
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/tasks/delete-task/${taskId}`);
      setTasks((prev) => prev.filter((tsk) => tsk._id !== taskId));
    } catch (error) {
      console.log("Error in deleting Task:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, [authUser]);

  return (
    <>
      {showModal && (
        <AddEditTask 
          task={task} 
          setTask={setTask} 
          handleSubmit={handleSubmit} 
          closeModal={() => setShowModal(false)}
        />
      )}

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className='flex-1 h-full bg-base-100 border border-base-200 overflow-auto rounded-[0.3rem]'>
        <div className='m-6 flex justify-between'>
          <h1 className='text-3xl font-bold mt-1'>All Tasks</h1>
          <Filters setPriority={setPriority} priority={priority} />
        </div>

        <div className='m-6 pb-[2rem] mt-6 grid grid-cols-3 gap-[1.5rem]'>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem key={task._id} task={task} onEdit={() => getTask(task._id)} onDelete={() => deleteTask(task._id)} />
            ))
          ) : (
            <p className="text-center col-span-full">No tasks available</p>
          )}

          <button 
            className='h-[7rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-4 border-grey-400 
            hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out'
            onClick={() => setShowModal(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </>
  );
};

export default MainTask;
