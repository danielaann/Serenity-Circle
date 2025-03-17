import TaskItem from "./TaskItem"; // Ensure the correct path
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const Pending = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks/get-all-task");
        // Filter only pending tasks
        const pendingTasks = response.data.tasks.filter(task => !task.completed && !task.overdue);
        setTasks(pendingTasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    fetchPendingTasks();
  }, []);

  return (
    <div className='flex h-full bg-base-100 border border-base-200 overflow-auto rounded-[0.3rem] p-6 gap-6'>
      <div className='flex-1'>
        <div className='flex justify-between mb-4'>
          <h1 className='text-3xl font-bold'>Pending Tasks</h1>
        </div>
        <div className='grid grid-cols-3 gap-[1.5rem]'>
          {tasks.length === 0 ? (
            <p>No pending tasks available</p>
          ) : (
            tasks.map((task) => <TaskItem key={task._id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Pending;
