import React, { useState } from 'react';

const AddEditTask = ({ task, setTask, handleSubmit, closeModal }) => {
  const handleInput = (name) => (e) => {
    setTask((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };


  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-[#333]/30'>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white rounded-lg shadow-md'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='title'>Title</label>
          <input 
            type='text' 
            name='title'
            id='title' 
            value={task.title}
            onChange={handleInput('title')}
            placeholder='Task Title' 
            className='bg-[#F9F9F9] border rounded-md p-2'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='description'>Description</label>
          <textarea 
            name='description'
            id='description' 
            value={task.description}
            onChange={handleInput('description')}
            placeholder='Task Description' 
            className='bg-[#F9F9F9] border rounded-md p-2 resize-none'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='priority'>Priority</label>
          <select 
            name='priority' 
            id='priority' 
            value={task.priority}
            onChange={handleInput('priority')}
            className='bg-[#F9F9F9] border rounded-md p-2 cursor-pointer'
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='dueDate'>Due Date</label>
          <input 
            type='date' 
            name='dueDate'
            id='dueDate' 
            value={task.dueDate ? task.dueDate.split("T")[0] : ""}
            onChange={handleInput('dueDate')}
            className='bg-[#F9F9F9] border rounded-md p-2'
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>

        </div>
      </form>
    </div>
  );
};

export default AddEditTask;
