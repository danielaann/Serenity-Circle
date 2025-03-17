import moment from 'moment';
import React, { useState } from 'react'
import { FormatTime } from './FormatTime';
import { Check, Pencil, Star, Trash2 } from 'lucide-react';

const TaskItem = ({
    task,
    onEdit,
    onDelete,
    onComplete
}) => {

    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleComplete = () => {
        setIsCompleted(!isCompleted);
        onComplete(task._id, !isCompleted);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return 'text-green-500';
            case 'medium':
                return 'text-yellow-500';
            case 'high':
                return 'text-red-500';
            default:
                return 'text-red-500';
        }
    }

    return (
        <div className='h-[7rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-slate-100 rounded-lg border-2 border-slate-200 overflow-hidden'>
            <div>
                <h4 className='font-semibold text-xl'>{task.title}</h4>
                <p>{task.description}</p>
            </div>
            <div className='mt-auto flex justify-between items-center'>
                <p className='text-sm text-gray-400'>{FormatTime(task.createdAt)}</p>
                <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </p>
                <div className='flex items-start gap-2'>
                    <button onClick={handleComplete}>
                        <Check
                            className="w-6 h-6 cursor-pointer transition-all duration-300"
                            // fill={isCompleted ? "#22C55E" : "none"} // Green when completed
                            stroke={isCompleted ? "#22C55E" : "#9CA3AF"} // Stroke color also changes
                            size={48} strokeWidth={3}
                        />
                    </button>


                    <Pencil className='icon-btn hover:text-green-600 ' onClick={onEdit} />
                    <Trash2 className='icon-btn hover:text-red-500' onClick={onDelete} />
                </div>
            </div>
        </div>
    )
}

export default TaskItem;