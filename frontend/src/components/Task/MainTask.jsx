import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import Filters from './Filters';
import TaskItem from './TaskItem';
import AddEditTask from './AddEditTask';
import toast from 'react-hot-toast';
import TaskSidebar from './TaskSidebar';

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
      toast.success("Task updated successfully");
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
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("Error in deleting Task:", error);
    }
    setLoading(false);
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    setLoading(true);
    try {
        const response = await axiosInstance.put(`/tasks/toggle-complete/${taskId}`);
        const updatedTask = response.data.task;

        // Update the task list with the new status
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
        toast.success("Task status updated");
    } catch (error) {
        console.log("Error updating task completion:", error);
        toast.error("Failed to update task status");
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

      {/* Main container with flex row */}
      <div className='flex h-full bg-base-100 border border-base-200 overflow-auto rounded-[0.3rem] p-6 gap-6'>

        {/* Left Section - Tasks */}
        <div className='flex-1'>
          <div className='flex justify-between mb-4'>
            <h1 className='text-3xl font-bold'>All Tasks</h1>
            <Filters setPriority={setPriority} priority={priority} />
          </div>

          {/* Task Grid */}
          <div className='grid grid-cols-3 gap-[1.5rem]'>
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onComplete={() => toggleTaskCompletion(task._id, task.completed)}
                  onEdit={() => getTask(task._id)} 
                  onDelete={() => deleteTask(task._id)} />
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

        {/* Right Section - Task Sidebar */}
        <div className="w-[15rem]">  
          <TaskSidebar tasks={tasks} loading={loading} />
        </div>

      </div>
    </>
  );
};

export default MainTask;
