import React, { useState } from 'react'
import TagInput from './TagInput';
import { X } from 'lucide-react';

const AddEditNotes = ({ noteData, type, onClose }) => {

    const [title,setTitle]=useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const [error, setError]=useState(null);

    //To add new note
    const addNewNote = async()=>{

    };

    //To edit existing note
    const editNote = async()=>{
        
    };

    const handleAddNote = () =>{
        if(!title){
            setError("Please enter the Title");
            return;
        }

        if(!content){
            setError("Please enter some Content");
            return;
        }

        setError("")

        if(type==='edit'){
            editNote()
        }else{
            addNewNote()
        }
    }

  return (
    <div className='relative'>
        <button
            className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
            onClick={onClose}
        >
            <X className="text-xl text-slate-400"/>
        </button>

        <div className='flex flex-col gap-2 w-[85%]'>
            <label className='input-label'>TITLE</label>
            <input
                type='text'
                className='text-2xl text-slate-950 outline-none'
                placeholder=' Journal it!'
                value={title}
                onChange={({target})=> setTitle(target.value)}
            />
        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea 
                type='text'
                className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                placeholder='Write what you feel!!'
                rows={10}
                value={content}
                onChange={({target})=> setContent(target.value)}
            />
        </div>

        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

        <button type="button" onClick={handleAddNote} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Add It
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </button>

    </div>
  )
}

export default AddEditNotes;