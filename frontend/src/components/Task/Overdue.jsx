import TaskItem from "./TaskItem"; // Ensure the correct path
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const Overdue = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchOverdueTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks/get-all-task");
        
        // Get current date (without time for accurate comparison)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
    
        // Filter overdue tasks (dueDate should be in ISO format)
        const overdueTasks = response.data.tasks.filter(task => {
          if (!task.dueDate) return false; // Skip tasks without a due date
          
          const taskDueDate = new Date(task.dueDate);
          taskDueDate.setHours(0, 0, 0, 0);
    
          return taskDueDate < currentDate && !task.completed; // Overdue if past due and not completed
        });
    
        setTasks(overdueTasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    fetchOverdueTasks();
  }, []);

  return (
    <div className='flex h-full bg-base-100 border border-base-200 overflow-auto rounded-[0.3rem] p-6 gap-6'>
      <div className='flex-1'>
        <div className='flex justify-between mb-4'>
          <h1 className='text-3xl font-bold'>Overdue Tasks</h1>
        </div>
        <div className='grid grid-cols-3 gap-[1.5rem]'>
          {tasks.length === 0 ? (
            <p>No overdue tasks. Keep it up!!</p>
          ) : (
            tasks.map((task) => <TaskItem key={task._id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Overdue;
